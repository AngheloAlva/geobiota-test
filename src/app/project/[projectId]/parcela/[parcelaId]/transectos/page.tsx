"use client"

import { useEffect, useState } from "react"

import {
	IoSyncOutline,
	IoPartlySunnyOutline,
	IoLocationOutline,
	IoPersonOutline,
	IoArrowBackOutline,
} from "react-icons/io5"
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

import { PROJECTS } from "@/lib/consts/projects"
import { PLOTS } from "@/lib/consts/plots"
import { Plot, Project } from "@/db/types"
import Image from "next/image"
import Logo from "@/components/icons/Logo"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { db } from "@/db"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

const transectoSchema = z.object({
	longitud: z.string().min(0.1, { message: "Longitud debe ser mayor a 0" }),
	transectos: z.array(
		z.object({
			inicio: z.number().min(0, { message: "Inicio debe ser mayor o igual a 0" }),
			fin: z.number().min(0, { message: "Fin debe ser mayor o igual a 0" }),
			especie: z.string().min(1, { message: "Especie es requerida" }),
			cobertura: z.number().min(0).max(100, { message: "Cobertura debe ser entre 0 y 100" }),
		})
	),
})

export default function TransectosPage({
	params,
}: {
	params: Promise<{ projectId: string; parcelaId: string }>
}): React.ReactElement {
	const [parcela, setParcela] = useState<Plot | null>(null)
	const [project, setProject] = useState<Project | null>(null)

	const { toast } = useToast()

	const form = useForm<z.infer<typeof transectoSchema>>({
		resolver: zodResolver(transectoSchema),
		defaultValues: {
			transectos: [{ inicio: 0, fin: 0, especie: "", cobertura: 0 }],
		},
	})

	const { fields, append } = useFieldArray({
		control: form.control,
		name: "transectos",
	})

	useEffect(() => {
		const fetchCot = async () => {
			const { projectId, parcelaId } = await params

			const projectData = PROJECTS.find((project) => project.id === projectId)
			const parcelaData = PLOTS.find((plot) => plot.id === parcelaId)

			setProject(projectData ?? null)
			setParcela(parcelaData ?? null)
		}

		void fetchCot()
	}, [params])

	const calculateCobertura = (inicio: number, fin: number, longitud: number) => {
		const tramo = fin - inicio
		return longitud > 0 ? (tramo / longitud) * 100 : 0
	}

	const onSubmit = async (values: z.infer<typeof transectoSchema>) => {
		console.log(values)

		try {
			await db.transects.add({
				plotId: parcela?.id ?? "",
				totalLongitude: parseInt(values.longitud),
				transects: values.transectos.map((transect) => ({
					unitStart: transect.inicio,
					unitEnd: transect.fin,
					specie: transect.especie,
					participation: transect.cobertura,
				})),
			})

			toast({
				title: "Transectos registrados correctamente",
				description: "Los transectos han sido registrados correctamente",
			})
		} catch (error) {
			console.log(error)

			toast({
				title: "Error al registrar transectos",
				description: "Ocurrió un error al registrar los transectos",
			})
		}
	}

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

				<div className="flex w-full flex-col">
					<div className="flex min-h-[60dvh] w-full flex-col bg-primary-g">
						<div className="mx-auto flex w-full max-w-screen-lg items-start justify-start pl-4 pt-4">
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
									<Card title="Transectos" className="mx-auto max-w-screen-lg px-4">
										<FormField
											control={form.control}
											name="longitud"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Longitud</FormLabel>
													<FormControl>
														<Input
															type="number"
															className="border-black/30 bg-black/30"
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>

										<div className="my-4 h-px w-full bg-black/30"></div>

										<div className="grid grid-cols-1 gap-x-4 gap-y-4 text-white sm:grid-cols-2">
											{fields.map((field, index) => (
												<div
													key={field.id}
													className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 sm:col-span-2 sm:grid-cols-4"
												>
													<FormField
														control={form.control}
														name={`transectos.${index}.inicio`}
														render={({ field }) => (
															<FormItem>
																<FormLabel>Inicio</FormLabel>
																<FormControl>
																	<Input
																		type="number"
																		step="0.1"
																		className="border-black/30 bg-black/30"
																		{...field}
																		onChange={(e) => {
																			const value = parseFloat(e.target.value)
																			field.onChange(value)
																			if (index > 0) {
																				const previousFin = form.getValues(
																					`transectos.${index - 1}.fin`
																				)
																				if (value !== previousFin) {
																					form.setValue(`transectos.${index}.inicio`, previousFin)
																				}
																			}
																		}}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={form.control}
														name={`transectos.${index}.fin`}
														render={({ field }) => (
															<FormItem>
																<FormLabel>Fin</FormLabel>
																<FormControl>
																	<Input
																		type="number"
																		step="0.1"
																		className="border-black/30 bg-black/30"
																		{...field}
																		onChange={(e) => {
																			const value = parseFloat(e.target.value)
																			field.onChange(value)
																			if (index < fields.length - 1) {
																				form.setValue(`transectos.${index + 1}.inicio`, value + 0.1)
																			}
																		}}
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={form.control}
														name={`transectos.${index}.especie`}
														render={({ field }) => (
															<FormItem>
																<FormLabel>Especie</FormLabel>
																<FormControl>
																	<Input className="border-black/30 bg-black/30" {...field} />
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
													<FormField
														control={form.control}
														name={`transectos.${index}.cobertura`}
														render={({ field }) => (
															<FormItem>
																<FormLabel>Cobertura (%)</FormLabel>
																<FormControl>
																	<Input
																		disabled
																		type="number"
																		value={calculateCobertura(
																			Number(form.getValues(`transectos.${index}.inicio`)),
																			Number(form.getValues(`transectos.${index}.fin`)),
																			Number(form.getValues("longitud"))
																		).toFixed(2)}
																		readOnly
																		className="border-black/30 bg-black/30 disabled:opacity-100"
																	/>
																</FormControl>
																<FormMessage />
															</FormItem>
														)}
													/>
												</div>
											))}
										</div>
										<Button
											type="button"
											onClick={() => append({ inicio: 0, fin: 0, especie: "", cobertura: 0 })}
											className="mt-4"
										>
											Agregar Transecto
										</Button>
									</Card>

									{fields.length > 0 && (
										<div className="mx-auto mt-6 flex max-w-screen-md">
											<Button type="submit" className="w-full text-base" size={"lg"}>
												Guardar
											</Button>
										</div>
									)}
								</form>
							</Form>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}
