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
import { PROJECTS } from "@/lib/consts/projects"
import { cobOptions } from "@/lib/consts/cob"
import { useToast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"
import { PLOTS } from "@/lib/consts/plots"
import Image from "next/image"
import { db } from "@/db"
import { z } from "zod"

import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Card from "@/components/shared/Card"
import Logo from "@/components/icons/Logo"
import {
	IoAddOutline,
	IoSyncOutline,
	IoPartlySunnyOutline,
	IoPersonOutline,
	IoTrashBinOutline,
	IoLocationOutline,
	IoArrowBackOutline,
} from "react-icons/io5"
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
import Link from "next/link"
import type { Plot, Project } from "@/db/types"

export default function CotPage({
	params,
}: {
	params: Promise<{ projectId: string; parcelaId: string }>
}): React.ReactElement {
	const [parcela, setParcela] = useState<Plot | null>(null)
	const [project, setProject] = useState<Project | null>(null)
	const [currentStep, setCurrentStep] = useState(1)

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

	useEffect(() => {
		const fetchCot = async () => {
			const { projectId, parcelaId } = await params

			const projectData = PROJECTS.find((project) => project.id === projectId)
			const parcelaData = PLOTS.find((plot) => plot.id === parcelaId)

			setProject(projectData ?? null)
			setParcela(parcelaData ?? null)

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
						hour: values.group1.hour,
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
						description: `COT agregado correctamente.`,
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

	const nextStep = () => setCurrentStep((prev) => prev + 1)
	const prevStep = () => setCurrentStep((prev) => prev - 1)

	return (
		<main className="mx-auto w-full overflow-x-hidden">
			<div className="flex w-full flex-col">
				<div className="relative">
					<Image
						src="/images/home-hero.jpg"
						alt="Logo"
						width={1920}
						height={1080}
						className="h-[40dvh] w-full object-cover"
					/>

					<Logo className="absolute bottom-4 right-4 h-12 w-auto text-white" />

					<div className="absolute left-0 top-1/2 mx-auto flex w-fit -translate-y-1/2 flex-wrap gap-x-8 gap-y-4 rounded-r-sm bg-primary-g p-4 shadow md:gap-x-14 md:px-8">
						<Card title={project?.name} className="w-fit">
							<p className="flex items-center gap-2 text-neutral-300">
								<IoPersonOutline /> {project?.client}
							</p>
							<p className="flex items-center gap-2 text-neutral-300">
								<IoPartlySunnyOutline /> {project?.seasonality} - {project?.year}
							</p>
							<p className="flex items-center gap-2 text-neutral-300">
								<IoSyncOutline />
								{project?.synchronized ? "Sincronizado" : "No sincronizado"}
							</p>
						</Card>

						<Card title={parcela?.name} className="w-fit">
							<p className="flex items-center gap-2 text-neutral-300">
								<IoLocationOutline /> {parcela?.gps.latitude}, {parcela?.gps.longitude}
							</p>
							<p className="flex items-center gap-2 text-neutral-300">
								<IoPartlySunnyOutline /> {parcela?.dimensions.width}mts x{" "}
								{parcela?.dimensions.length}mts
							</p>
							<p className="flex items-center gap-2 text-neutral-300">
								<IoSyncOutline />
								{parcela?.synchronized ? "Sincronizado" : "No sincronizado"}
							</p>
						</Card>
					</div>
				</div>

				<div className="flex min-h-[60dvh] w-full flex-col bg-primary-g">
					<div className="mx-auto flex w-full max-w-screen-md items-start justify-start pt-4">
						<Link
							href={`/project/${project?.id}/parcela/${parcela?.id}`}
							className="flex items-center gap-2 text-white hover:underline"
						>
							<IoArrowBackOutline className="h-6 w-auto text-white" />
							<p className="text-white">Volver</p>
						</Link>
					</div>

					<div className="h-full pb-16 pt-8">
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)}>
								{currentStep === 1 && (
									<Card
										title="COT"
										className="mx-auto max-w-screen-md rounded-sm bg-secondary-2-g p-4 shadow"
									>
										<div className="mx-auto grid w-full grid-cols-1 gap-x-4 gap-y-4 text-white sm:grid-cols-2">
											<FormField
												control={form.control}
												name="group1.quadrille"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Cuadrilla</FormLabel>
														<FormControl>
															<Input className="border-black/20 bg-black/40" {...field} />
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
																className="border-black/20 bg-black/40"
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
															<Input {...field} className="border-black/20 bg-black/40" />
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
														className="border-black/20 bg-black/40"
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
																className="mt-0.5 border-black/20 bg-black/40"
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
															<Input className="border-black/20 bg-black/40" {...field} />
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
															<Input className="border-black/20 bg-black/40" {...field} />
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
															<Input className="border-black/20 bg-black/40" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>

										<div className="my-4 h-px w-full bg-black/20"></div>

										<Button
											size={"lg"}
											type="button"
											onClick={nextStep}
											className="mt-4 w-full bg-primary-g text-base"
										>
											Siguiente
										</Button>
									</Card>
								)}

								{currentStep === 2 && (
									<Card
										title="Registro de Vegetación"
										className="mx-auto max-w-screen-md rounded-sm bg-secondary-2-g p-4 shadow"
									>
										<div className="grid w-full grid-cols-1 gap-x-4 gap-y-4 text-white sm:grid-cols-2">
											<FormField
												control={form.control}
												name="group2.cover"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Cobertura</FormLabel>
														<Select onValueChange={field.onChange} defaultValue={field.value}>
															<FormControl>
																<SelectTrigger className="border-black/20 bg-black/40">
																	<SelectValue placeholder="Seleccione una cobertura" />
																</SelectTrigger>
															</FormControl>
															<SelectContent className="">
																{cobOptions.map((cob) => (
																	<SelectItem
																		key={cob}
																		value={cob}
																		className="focus:bg-secondary-2-g focus:text-white"
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
																<SelectTrigger className="border-black/20 bg-black/40">
																	<SelectValue placeholder="Seleccione una formación" />
																</SelectTrigger>
																<SelectContent className="">
																	{plantFormationOptions.map((formation) => (
																		<SelectItem
																			key={formation}
																			value={formation}
																			className="focus:bg-secondary-2-g focus:text-white"
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

											<Button
												size={"lg"}
												type="button"
												className="mt-4 w-full bg-primary-g sm:col-span-2"
												onClick={() => append({ sps: "" })}
											>
												Agregar SPS Terreno <IoAddOutline className="h-4 w-4" />
											</Button>

											{fields.map((field, index) => (
												<FormField
													key={field.id}
													control={form.control}
													name={`group2.spsTerrain.${index}.sps`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>Especie {index + 1}</FormLabel>
															<FormControl>
																<div className="flex items-center gap-1">
																	<Input className="border-black/20 bg-black/40" {...field} />
																	<Button
																		type="button"
																		onClick={() => remove(index)}
																		className="bg-primary-g"
																	>
																		<IoTrashBinOutline className="h-4 w-4" />
																	</Button>
																</div>
															</FormControl>
														</FormItem>
													)}
												/>
											))}
										</div>

										<div className="my-4 h-px w-full bg-black/20"></div>

										<div className="flex justify-between gap-4">
											<Button
												type="button"
												size={"lg"}
												onClick={prevStep}
												variant={"outline"}
												className="w-full border-neutral-500 bg-white/80 text-primary-g"
											>
												Anterior
											</Button>
											<Button
												type="button"
												onClick={nextStep}
												className="w-full bg-primary-g"
												size={"lg"}
											>
												Siguiente
											</Button>
										</div>
									</Card>
								)}

								{currentStep === 3 && (
									<Card
										title="Condiciones de terreno"
										className="mx-auto max-w-screen-md rounded-sm bg-secondary-2-g p-4 shadow"
									>
										<div className="grid w-full grid-cols-1 gap-x-4 gap-y-4 text-white sm:grid-cols-2">
											<FormField
												control={form.control}
												name="group3.exposition"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Exposición</FormLabel>
														<FormControl>
															<Select onValueChange={field.onChange} defaultValue={field.value}>
																<SelectTrigger className="border-black/20 bg-black/40">
																	<SelectValue placeholder="Seleccione una exposición" />
																</SelectTrigger>
																<SelectContent className="">
																	{exposureOptions.map((exposition) => (
																		<SelectItem
																			key={exposition}
																			value={exposition}
																			className="focus:bg-secondary-2-g focus:text-white"
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
																<SelectTrigger className="border-black/20 bg-black/40">
																	<SelectValue placeholder="Seleccione un drenaje" />
																</SelectTrigger>
																<SelectContent className="">
																	{drainageOptions.map((drainage) => (
																		<SelectItem
																			key={drainage}
																			value={drainage}
																			className="focus:bg-secondary-2-g focus:text-white"
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
																<SelectTrigger className="border-black/20 bg-black/40">
																	<SelectValue placeholder="Seleccione una topografía" />
																</SelectTrigger>
																<SelectContent className="">
																	{topographyOptions.map((topography) => (
																		<SelectItem
																			key={topography}
																			value={topography}
																			className="focus:bg-secondary-2-g focus:text-white"
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
																<SelectTrigger className="border-black/20 bg-black/40">
																	<SelectValue placeholder="Seleccione un sustrato" />
																</SelectTrigger>
																<SelectContent className="">
																	{substratumOptions.map((substratum) => (
																		<SelectItem
																			key={substratum}
																			value={substratum}
																			className="focus:bg-secondary-2-g focus:text-white"
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
																<SelectTrigger className="border-black/20 bg-black/40">
																	<SelectValue placeholder="Seleccione una pendiente" />
																</SelectTrigger>
																<SelectContent className="">
																	{pendingOptions.map((slope) => (
																		<SelectItem
																			key={slope}
																			value={slope}
																			className="focus:bg-secondary-2-g focus:text-white"
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
																<SelectTrigger className="border-black/20 bg-black/40">
																	<SelectValue placeholder="Seleccione una intervención" />
																</SelectTrigger>
																<SelectContent className="">
																	{interventionOptions.map((intervention) => (
																		<SelectItem
																			key={intervention}
																			value={intervention}
																			className="focus:bg-secondary-2-g focus:text-white"
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

										<div className="my-4 h-px w-full bg-black/20"></div>

										<div className="flex justify-between gap-4">
											<Button
												type="button"
												onClick={prevStep}
												variant={"outline"}
												className="w-full border-primary-g bg-white text-primary-g"
												size={"lg"}
											>
												Anterior
											</Button>
											<Button
												type="button"
												onClick={nextStep}
												className="w-full bg-primary-g"
												size={"lg"}
											>
												Siguiente
											</Button>
										</div>
									</Card>
								)}

								{currentStep === 4 && (
									<Card
										title="Registro opcional para Bosques"
										className="mx-auto max-w-screen-md rounded-sm bg-secondary-2-g p-4 shadow"
									>
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
																		<SelectTrigger className="border-black/20 bg-black/40">
																			<SelectValue placeholder="Seleccione un origen" />
																		</SelectTrigger>
																		<SelectContent className="">
																			{origenOptions.map((origen) => (
																				<SelectItem
																					key={origen}
																					value={origen}
																					className="focus:bg-secondary-2-g focus:text-white"
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
																		<SelectTrigger className="border-black/20 bg-black/40">
																			<SelectValue placeholder="Seleccione un desarrollo" />
																		</SelectTrigger>
																		<SelectContent className="">
																			{growthOptions.map((growth) => (
																				<SelectItem
																					key={growth}
																					value={growth}
																					className="focus:bg-secondary-2-g focus:text-white"
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
																<SelectTrigger className="border-black/20 bg-black/40">
																	<SelectValue placeholder="Seleccione un estado sanitario" />
																</SelectTrigger>
																<SelectContent className="">
																	{healthStatusOptions.map((healthStatus) => (
																		<SelectItem
																			key={healthStatus}
																			value={healthStatus}
																			className="focus:bg-secondary-2-g focus:text-white"
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

										<div className="my-4 h-px w-full bg-black/20"></div>

										<div className="flex justify-between gap-4">
											<Button
												type="button"
												onClick={prevStep}
												variant={"outline"}
												className="w-full border-primary-g bg-white text-primary-g"
												size={"lg"}
											>
												Anterior
											</Button>
											<Button type="submit" className="w-full bg-primary-g" size={"lg"}>
												Guardar
											</Button>
										</div>
									</Card>
								)}
							</form>
						</Form>
					</div>
				</div>
			</div>
		</main>
	)
}
