"use client"

import { createCotSchema } from "@/lib/schemas/createCot.schema"
import { plantFormationOptions } from "@/lib/consts/plantFormation"
import { interventionOptions } from "@/lib/consts/intervention"
import { healthStatusOptions } from "@/lib/consts/healthStatus"
import { topographyOptions } from "@/lib/consts/topography"
import { substratumOptions } from "@/lib/consts/substratum"
import { useFieldArray, useForm } from "react-hook-form"
import { exposureOptions } from "@/lib/consts/exposure"
import { drainageOptions } from "@/lib/consts/drainage"
import { zodResolver } from "@hookform/resolvers/zod"
import { pendingOptions } from "@/lib/consts/pending"
import { origenOptions } from "@/lib/consts/origen"
import { growthOptions } from "@/lib/consts/growth"
import { getGeolocation } from "@/lib/geolocation"
import { cobOptions } from "@/lib/consts/cob"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { db } from "@/db"
import { z } from "zod"

import { IoTrashBinOutline } from "react-icons/io5"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Card from "@/components/shared/Card"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

export default function CotPage({
	params,
}: {
	params: Promise<{ projectId: string; parcelaId: string }>
}): React.ReactElement {
	const form = useForm<z.infer<typeof createCotSchema>>({
		resolver: zodResolver(createCotSchema),
		defaultValues: {
			group1: {
				quadrille: "",
				date: new Date(),
				gps: {
					latitude: "",
					longitude: "",
				},
				hour: "",
			},
			group2: {
				cover: "",
				formation: "",
				spsTerrain: [
					{
						sps: "",
					},
				],
			},
			group3: {
				slope: "",
				drainage: "",
				susbtract: "",
				topography: "",
				exposition: "",
				intervention: "",
			},
			group4: {
				origin: "",
				development: "",
				sanitaryStatus: "",
			},
		},
	})

	const [showForestItems, setShowForestItems] = useState(false)

	const { toast } = useToast()
	const router = useRouter()

	useEffect(() => {
		const fetchCot = async () => {
			const { parcelaId } = await params

			const cot = await db.cots.where("plotId").equals(parcelaId).toArray()
			if (cot.length > 0) {
				form.reset({
					...cot[0],
					group1: {
						...cot[0].group1,
						gps: {
							...cot[0].group1.gps,
							latitude: cot[0].group1.gps.latitude.toString(),
							longitude: cot[0].group1.gps.longitude.toString(),
							altitude: cot[0].group1.gps.altitude?.toString(),
						},
						hour: cot[0].group1.hour.toString(),
					},
					group2: {
						...cot[0].group2,
						spsTerrain: cot[0].group2.spsTerrain.map((sps) => ({ sps })),
					},
				})
			}
		}

		void fetchCot()
	}, [form, params])

	useEffect(() => {
		const setGps = async () => {
			const geo = await getGeolocation()
			form.setValue("group1.gps.latitude", geo.coords.latitude.toString())
			form.setValue("group1.gps.longitude", geo.coords.longitude.toString())
		}

		if (form.watch("gpsAuto")) {
			void setGps()
		}
	}, [form.watch("gpsAuto")])

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "group2.spsTerrain",
	})

	useEffect(() => {
		if (
			form.watch("group2.formation") === "Bosque" ||
			form.watch("group2.formation") === "Bosque con suculentas"
		) {
			setShowForestItems(true)
		} else {
			setShowForestItems(false)
		}
	}, [form.watch("group2.formation")])

	const onSubmit = async (values: z.infer<typeof createCotSchema>) => {
		console.log(values)

		try {
			await db.cots
				.add({
					...values,
					group1: {
						...values.group1,
						hour: Number(values.group1.hour),
						gps: {
							latitude: Number(values.group1.gps.latitude),
							longitude: Number(values.group1.gps.longitude),
							altitude: Number(values.group1.gps.altitude) || undefined,
						},
					},
					group2: {
						...values.group2,
						spsTerrain: values.group2.spsTerrain.map((sps) => sps.sps),
					},
					plotId: (await params).parcelaId,
				})
				.then((id) => {
					toast({
						title: "COT agregado",
						description: `COT con ID ${id} agregado correctamente. Ahora puedes agregar el grupo 2`,
					})
				})

			// router.push(`/project/${(await params).projectId}/parcela/${(await params).parcelaId}/cot/2`)
		} catch (error) {
			console.log(error)
			toast({
				title: "Error al agregar COT",
				description: "Hubo un error al agregar el COT",
				variant: "destructive",
			})
		}
	}

	useEffect(() => {
		console.log(form.formState.errors)
	}, [form.formState.errors])

	return (
		<main className="mx-auto grid w-full max-w-screen-lg grid-cols-1 items-center justify-center gap-x-4 gap-y-6 overflow-hidden px-4 py-24 md:px-6 xl:px-0">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<Card title="COT">
						<div className="grid grid-cols-1 gap-x-4 gap-y-4 text-white sm:grid-cols-2">
							<FormField
								control={form.control}
								name="group1.quadrille"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Cuadrilla</FormLabel>
										<FormControl>
											<Input className="border-black/30 bg-black/30" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="group1.date"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Fecha</FormLabel>
										<FormControl>
											<Input
												type="date"
												className="border-black/30 bg-black/30"
												{...field}
												value={field.value?.toISOString().split("T")[0]}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="group1.hour"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Hora</FormLabel>
										<FormControl>
											<Input {...field} className="border-black/30 bg-black/30" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormItem>
								<FormLabel>Imagen</FormLabel>
								<FormControl>
									<Input
										id="image"
										type="file"
										accept="image/*"
										className="border-black/30 bg-black/30"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>

							<FormField
								control={form.control}
								name="gpsAuto"
								render={({ field }) => (
									<FormItem className="mt-2 flex flex-row items-center space-x-3 space-y-0 sm:col-span-2">
										<FormControl>
											<Checkbox
												className="mt-0.5 border-black/30 bg-black/30"
												checked={field.value}
												onCheckedChange={field.onChange}
											/>
										</FormControl>
										<div className="space-y-1 leading-none">
											<FormLabel>Obtener ubicación automáticamente</FormLabel>
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="group1.gps.latitude"
								render={({ field }) => (
									<FormItem className="grid gap-y-2">
										<FormLabel htmlFor="latitud">Latitud</FormLabel>
										<FormControl>
											<Input className="border-black/30 bg-black/30" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="group1.gps.longitude"
								render={({ field }) => (
									<FormItem className="grid gap-y-2">
										<FormLabel htmlFor="longitud">Longitud</FormLabel>
										<FormControl>
											<Input className="border-black/30 bg-black/30" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="group1.gps.altitude"
								render={({ field }) => (
									<FormItem className="grid gap-y-2">
										<FormLabel htmlFor="altitude">Altitud</FormLabel>
										<FormControl>
											<Input className="border-black/30 bg-black/30" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</Card>

					<Card title="Registro de Vegetación">
						<div className="grid grid-cols-1 gap-x-4 gap-y-4 text-white sm:grid-cols-2">
							<FormField
								control={form.control}
								name="group2.cover"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Cobertura</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger className="border-black/30 bg-black/30">
													<SelectValue placeholder="Seleccione una cobertura" />
												</SelectTrigger>
											</FormControl>
											<SelectContent className="border-black/30 bg-black text-white">
												{cobOptions.map((cob) => (
													<SelectItem
														key={cob}
														value={cob}
														className="focus:bg-green-500/30 focus:text-white"
													>
														{cob}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="group2.formation"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Formación</FormLabel>
										<FormControl>
											<Select onValueChange={field.onChange} defaultValue={field.value}>
												<SelectTrigger className="border-black/30 bg-black/30">
													<SelectValue placeholder="Seleccione una formación" />
												</SelectTrigger>
												<SelectContent className="border-black/30 bg-black text-white">
													{plantFormationOptions.map((formation) => (
														<SelectItem
															key={formation}
															value={formation}
															className="focus:bg-green-500/30 focus:text-white"
														>
															{formation}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							{fields.map((field, index) => (
								<FormField
									key={field.id}
									control={form.control}
									name={`group2.spsTerrain.${index}.sps`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>SPS Terreno</FormLabel>
											<FormControl>
												<div className="flex items-center gap-1">
													<Input className="border-black/30 bg-black/30" {...field} />
													<Button type="button" onClick={() => remove(index)}>
														<IoTrashBinOutline className="h-4 w-4" />
													</Button>
												</div>
											</FormControl>
										</FormItem>
									)}
								/>
							))}

							<Button
								type="button"
								className="w-full sm:col-span-2"
								onClick={() => append({ sps: "" })}
							>
								Agregar SPS Terreno
							</Button>
						</div>
					</Card>

					<Card title="Condiciones de terreno">
						<div className="grid grid-cols-1 gap-x-4 gap-y-4 text-white sm:grid-cols-2">
							<FormField
								control={form.control}
								name="group3.exposition"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Exposición</FormLabel>
										<FormControl>
											<Select onValueChange={field.onChange} defaultValue={field.value}>
												<SelectTrigger className="border-black/30 bg-black/30">
													<SelectValue placeholder="Seleccione una exposición" />
												</SelectTrigger>
												<SelectContent className="border-black/30 bg-black text-white">
													{exposureOptions.map((exposition) => (
														<SelectItem
															key={exposition}
															value={exposition}
															className="focus:bg-green-500/30 focus:text-white"
														>
															{exposition}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="group3.drainage"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Drenaje</FormLabel>
										<FormControl>
											<Select onValueChange={field.onChange} defaultValue={field.value}>
												<SelectTrigger className="border-black/30 bg-black/30">
													<SelectValue placeholder="Seleccione un drenaje" />
												</SelectTrigger>
												<SelectContent className="border-black/30 bg-black text-white">
													{drainageOptions.map((drainage) => (
														<SelectItem
															key={drainage}
															value={drainage}
															className="focus:bg-green-500/30 focus:text-white"
														>
															{drainage}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="group3.topography"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Topografía</FormLabel>
										<FormControl>
											<Select onValueChange={field.onChange} defaultValue={field.value}>
												<SelectTrigger className="border-black/30 bg-black/30">
													<SelectValue placeholder="Seleccione una topografía" />
												</SelectTrigger>
												<SelectContent className="border-black/30 bg-black text-white">
													{topographyOptions.map((topography) => (
														<SelectItem
															key={topography}
															value={topography}
															className="focus:bg-green-500/30 focus:text-white"
														>
															{topography}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="group3.susbtract"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Sustrato</FormLabel>
										<FormControl>
											<Select onValueChange={field.onChange} defaultValue={field.value}>
												<SelectTrigger className="border-black/30 bg-black/30">
													<SelectValue placeholder="Seleccione un sustrato" />
												</SelectTrigger>
												<SelectContent className="border-black/30 bg-black text-white">
													{substratumOptions.map((substratum) => (
														<SelectItem
															key={substratum}
															value={substratum}
															className="focus:bg-green-500/30 focus:text-white"
														>
															{substratum}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="group3.slope"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Pendiente</FormLabel>
										<FormControl>
											<Select onValueChange={field.onChange} defaultValue={field.value}>
												<SelectTrigger className="border-black/30 bg-black/30">
													<SelectValue placeholder="Seleccione una pendiente" />
												</SelectTrigger>
												<SelectContent className="border-black/30 bg-black text-white">
													{pendingOptions.map((slope) => (
														<SelectItem
															key={slope}
															value={slope}
															className="focus:bg-green-500/30 focus:text-white"
														>
															{slope}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="group3.intervention"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Intervención</FormLabel>
										<FormControl>
											<Select onValueChange={field.onChange} defaultValue={field.value}>
												<SelectTrigger className="border-black/30 bg-black/30">
													<SelectValue placeholder="Seleccione una intervención" />
												</SelectTrigger>
												<SelectContent className="border-black/30 bg-black text-white">
													{interventionOptions.map((intervention) => (
														<SelectItem
															key={intervention}
															value={intervention}
															className="focus:bg-green-500/30 focus:text-white"
														>
															{intervention}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</Card>

					<Card title="Registro opcional para Bosques">
						<div className="grid grid-cols-1 gap-x-4 gap-y-4 text-white sm:grid-cols-2">
							{showForestItems && (
								<>
									<FormField
										control={form.control}
										name="group4.origin"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Origen</FormLabel>
												<FormControl>
													<Select onValueChange={field.onChange} defaultValue={field.value}>
														<SelectTrigger className="border-black/30 bg-black/30">
															<SelectValue placeholder="Seleccione un origen" />
														</SelectTrigger>
														<SelectContent className="border-black/30 bg-black text-white">
															{origenOptions.map((origen) => (
																<SelectItem
																	key={origen}
																	value={origen}
																	className="focus:bg-green-500/30 focus:text-white"
																>
																	{origen}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="group4.development"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Desarrollo</FormLabel>
												<FormControl>
													<Select onValueChange={field.onChange} defaultValue={field.value}>
														<SelectTrigger className="border-black/30 bg-black/30">
															<SelectValue placeholder="Seleccione un desarrollo" />
														</SelectTrigger>
														<SelectContent className="border-black/30 bg-black text-white">
															{growthOptions.map((growth) => (
																<SelectItem
																	key={growth}
																	value={growth}
																	className="focus:bg-green-500/30 focus:text-white"
																>
																	{growth}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</>
							)}

							<FormField
								control={form.control}
								name="group4.sanitaryStatus"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Estado sanitario</FormLabel>
										<FormControl>
											<Select onValueChange={field.onChange} defaultValue={field.value}>
												<SelectTrigger className="border-black/30 bg-black/30">
													<SelectValue placeholder="Seleccione un estado sanitario" />
												</SelectTrigger>
												<SelectContent className="border-black/30 bg-black text-white">
													{healthStatusOptions.map((healthStatus) => (
														<SelectItem
															key={healthStatus}
															value={healthStatus}
															className="focus:bg-green-500/30 focus:text-white"
														>
															{healthStatus}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</Card>

					<Button className="w-full bg-black/30 text-base" type="submit" size="lg">
						Guardar
					</Button>
				</form>
			</Form>
		</main>
	)
}
