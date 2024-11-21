"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
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
import { z } from "zod"
import Image from "next/image"
import { IoArrowBackOutline, IoLocationOutline } from "react-icons/io5"
import Logo from "@/components/icons/Logo"
import { IoPartlySunnyOutline, IoPersonOutline, IoSyncOutline } from "react-icons/io5"

import type { Project, Plot } from "@/db/types"
import { PROJECTS } from "@/lib/consts/projects"
import { PLOTS } from "@/lib/consts/plots"
import { cobRangeOptions } from "@/lib/consts/cob"
import { laSpecies } from "@/lib/consts/laSpecies"
import { lbSpecies } from "@/lib/consts/lbSpecies"
import { sSpecies } from "@/lib/consts/sSpecies"
import { hSpecies } from "@/lib/consts/hSpecies"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

const formaDeVidaSchema = z.object({
	formaDeVida: z.string().min(1, { message: "Forma de vida es requerida" }),
	tramos: z.array(
		z.object({
			cobertura: z.string().min(0).max(100, { message: "Cobertura debe ser entre 0 y 100" }),
			sp1: z.string().optional(),
			participationSp1: z.string().min(0).max(100).optional(),
			sp2: z.string().optional(),
			participationSp2: z.string().min(0).max(100).optional(),
			sp3: z.string().optional(),
			participationSp3: z.string().min(0).max(100).optional(),
		})
	),
})

const formaDeVidaOptions = ["Lechoso Alto", "Lechoso Bajo", "Suculentos", "Herbaceos"]

const cobLa = [">20", "12-20", "8-12", "4-8", "2-4", "<2"]
const cobLb = [">2", "1-2", "0.5-1", "<0.5"]
const cobS = [">2", "1-2", "0.5-1", "<0.5"]
const cobH = ["0.5", "1"]

export default function FormaDeVidaPage({
	params,
}: {
	params: Promise<{ projectId: string; parcelaId: string }>
}): React.ReactElement {
	const [parcela, setParcela] = useState<Plot | null>(null)
	const [project, setProject] = useState<Project | null>(null)
	const [species, setSpecies] = useState<string[]>([])
	const [tramos, setTramos] = useState<string[]>([])

	const { toast } = useToast()

	useEffect(() => {
		const fetchData = async () => {
			if (typeof window !== "undefined") {
				const { projectId, parcelaId } = await params

				const projectData = PROJECTS.find((project) => project.id === projectId)
				const parcelaData = PLOTS.find((plot) => plot.id === parcelaId)

				setProject(projectData ?? null)
				setParcela(parcelaData ?? null)
			}
		}

		fetchData()
	}, [params])

	const form = useForm<z.infer<typeof formaDeVidaSchema>>({
		resolver: zodResolver(formaDeVidaSchema),
		defaultValues: {
			formaDeVida: "",
			tramos: [],
		},
	})

	useEffect(() => {
		if (Object.keys(form.formState.errors).length > 0) {
			const errorMessages = Object.values(form.formState.errors)
				.flatMap((group) => Object.values(group).map((error) => error.message))
				.join(", ")

			toast({
				title: "Error",
				description: errorMessages,
				variant: "destructive",
			})
		}
	}, [form.formState.errors])

	const { fields, remove } = useFieldArray({
		control: form.control,
		name: "tramos",
	})

	useEffect(() => {
		const formaDeVida = form.watch("formaDeVida")
		let numTramos = 0

		switch (formaDeVida) {
			case "Lechoso Alto":
				numTramos = 7
				setTramos(cobLa)
				setSpecies(laSpecies)
				break
			case "Lechoso Bajo":
				setTramos(cobLb)
				setSpecies(lbSpecies)
				numTramos = 4
				break
			case "Suculentos":
				setTramos(cobS)
				setSpecies(sSpecies)
				numTramos = 4
				break
			case "Herbaceos":
				setTramos(cobH)
				setSpecies(hSpecies)
				numTramos = 2
				break
			default:
				setTramos([])
				setSpecies([])
				numTramos = 0
		}

		const currentTramos = form.getValues("tramos")
		if (currentTramos.length !== numTramos) {
			form.setValue(
				"tramos",
				Array(numTramos).fill({
					cobertura: "",
					sp1: "",
					participationSp1: "",
					sp2: "",
					participationSp2: "",
					sp3: "",
					participationSp3: "",
				})
			)
		}
	}, [form.watch("formaDeVida")])

	const onSubmit = async (values: z.infer<typeof formaDeVidaSchema>) => {
		console.log(values)
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

				<div className="flex min-h-[60dvh] w-full flex-col bg-primary-g">
					<div className="mx-auto flex w-full max-w-screen-lg items-start justify-start pt-4">
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
								<Card
									title="Forma de Vida"
									className="mx-auto max-w-screen-lg rounded-sm bg-secondary-2-g p-4 shadow"
								>
									<div className="grid grid-cols-1 gap-x-4 gap-y-4 text-white sm:grid-cols-2">
										<FormField
											control={form.control}
											name="formaDeVida"
											render={({ field }) => (
												<FormItem className="sm:col-span-2">
													<FormLabel>Tipo de Forma de Vida</FormLabel>
													<FormControl>
														<Select onValueChange={field.onChange} defaultValue={field.value}>
															<SelectTrigger className="border-black/30 bg-black/30">
																<SelectValue placeholder="Seleccione una forma de vida" />
															</SelectTrigger>
															<SelectContent className="border-black/30 bg-black text-white">
																{formaDeVidaOptions.map((option) => (
																	<SelectItem
																		key={option}
																		value={option}
																		className="focus:bg-green-500/30 focus:text-white"
																	>
																		{option}
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
											<div
												key={field.id}
												className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2 sm:col-span-2 sm:grid-cols-4"
											>
												<div className="my-4 h-px w-full bg-black/30 sm:col-span-2 md:col-span-4"></div>

												<h3 className="col-span-2 text-base font-semibold sm:col-span-4">
													Tramo {tramos[index]}
												</h3>

												<FormField
													control={form.control}
													name={`tramos.${index}.cobertura`}
													render={({ field }) => (
														<FormItem className="col-span-2 sm:col-span-4">
															<FormLabel>Cobertura Tramo</FormLabel>

															<FormControl>
																<Select
																	onValueChange={field.onChange}
																	defaultValue={field.value.toString()}
																>
																	<SelectTrigger className="border-black/30 bg-black/30">
																		<SelectValue placeholder="Seleccione una cobertura" />
																	</SelectTrigger>
																	<SelectContent className="border-black/30 bg-black text-white">
																		{cobRangeOptions.map((option) => (
																			<SelectItem
																				key={option}
																				value={option}
																				className="focus:bg-green-500/30 focus:text-white"
																			>
																				{option}
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
													name={`tramos.${index}.sp1`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>Espcie 1</FormLabel>
															<FormControl>
																<Select onValueChange={field.onChange} defaultValue={field.value}>
																	<SelectTrigger className="border-black/30 bg-black/30">
																		<SelectValue placeholder="Seleccione una especie" />
																	</SelectTrigger>
																	<SelectContent className="border-black/30 bg-black text-white">
																		{species.map((option) => (
																			<SelectItem key={option} value={option}>
																				{option}
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
													name={`tramos.${index}.participationSp1`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>Participación Sp1</FormLabel>
															<FormControl>
																<div className="flex items-center gap-1">
																	<Input
																		type="number"
																		className="border-black/30 bg-black/30"
																		{...field}
																	/>
																	<Button
																		disabled
																		size="icon"
																		aria-readonly
																		className="px-6 disabled:opacity-100"
																	>
																		%
																	</Button>
																</div>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name={`tramos.${index}.sp2`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>Espcie 2</FormLabel>
															<FormControl>
																<Input className="border-black/30 bg-black/30" {...field} />
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name={`tramos.${index}.participationSp2`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>Participación Sp2</FormLabel>
															<FormControl>
																<div className="flex items-center gap-1">
																	<Input
																		type="number"
																		className="border-black/30 bg-black/30"
																		{...field}
																	/>
																	<Button
																		disabled
																		size="icon"
																		aria-readonly
																		className="px-6 disabled:opacity-100"
																	>
																		%
																	</Button>
																</div>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name={`tramos.${index}.sp3`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>Especie 3</FormLabel>
															<FormControl>
																<Input className="border-black/30 bg-black/30" {...field} />
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={form.control}
													name={`tramos.${index}.participationSp3`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>Participación Sp3</FormLabel>
															<FormControl>
																<div className="flex items-center gap-1">
																	<Input
																		type="number"
																		className="border-black/30 bg-black/30"
																		{...field}
																	/>
																	<Button
																		disabled
																		size="icon"
																		aria-readonly
																		className="px-6 disabled:opacity-100"
																	>
																		%
																	</Button>
																</div>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>
										))}
									</div>
								</Card>

								{fields.length > 0 && (
									<div className="mx-auto mt-6 flex max-w-screen-lg">
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
		</main>
	)
}
