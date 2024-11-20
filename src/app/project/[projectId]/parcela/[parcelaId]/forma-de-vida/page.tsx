"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
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

// Define schema for form validation
const formaDeVidaSchema = z.object({
	formaDeVida: z.string().min(1, { message: "Forma de vida es requerida" }),
	tramos: z.array(
		z.object({
			cobertura: z.number().min(0).max(100, { message: "Cobertura debe ser entre 0 y 100" }),
			sp1: z.string().optional(),
			sp2: z.string().optional(),
			sp3: z.string().optional(),
		})
	),
})

const formaDeVidaOptions = ["Lechoso Alto", "Lechoso Bajo", "Suculentos", "Herbaceos"]

export default function FormaDeVidaPage({
	params,
}: {
	params: Promise<{ projectId: string; parcelaId: string }>
}): React.ReactElement {
	const form = useForm<z.infer<typeof formaDeVidaSchema>>({
		resolver: zodResolver(formaDeVidaSchema),
		defaultValues: {
			formaDeVida: "",
			tramos: [],
		},
	})

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "tramos",
	})

	useEffect(() => {
		const formaDeVida = form.watch("formaDeVida")
		let numTramos = 0

		switch (formaDeVida) {
			case "Lechoso Alto":
				numTramos = 7
				break
			case "Lechoso Bajo":
			case "Suculentos":
				numTramos = 4
				break
			case "Herbaceos":
				numTramos = 3
				break
			default:
				numTramos = 0
		}

		// Adjust the number of tramos
		const currentTramos = form.getValues("tramos")
		if (currentTramos.length !== numTramos) {
			form.setValue("tramos", Array(numTramos).fill({ cobertura: 0, sp1: "", sp2: "", sp3: "" }))
		}
	}, [form.watch("formaDeVida")])

	const onSubmit = async (values: z.infer<typeof formaDeVidaSchema>) => {
		console.log(values)
		// No need to save data for now, just a demonstration
	}

	return (
		<main className="mx-auto grid w-full max-w-screen-lg grid-cols-1 items-center justify-center gap-x-4 gap-y-6 overflow-hidden px-4 py-24 md:px-6 xl:px-0">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
					<Card title="Forma de Vida">
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
									<h3 className="col-span-2 text-base font-semibold sm:col-span-4">
										Tramo {index + 1}
									</h3>
									<FormField
										control={form.control}
										name={`tramos.${index}.cobertura`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Cobertura Tramo {index + 1}</FormLabel>
												<FormControl>
													<Input type="number" className="border-black/30 bg-black/30" {...field} />
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
												<FormLabel>Sp1 Tramo {index + 1}</FormLabel>
												<FormControl>
													<Input className="border-black/30 bg-black/30" {...field} />
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
												<FormLabel>Sp2 Tramo {index + 1}</FormLabel>
												<FormControl>
													<Input className="border-black/30 bg-black/30" {...field} />
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
												<FormLabel>Sp3 Tramo {index + 1}</FormLabel>
												<FormControl>
													<Input className="border-black/30 bg-black/30" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							))}
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
