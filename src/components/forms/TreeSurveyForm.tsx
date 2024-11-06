"use client"

import { treeNames, treeTypes, contentSurveyOptions } from "@/lib/consts"
import { saveSurveysToDB } from "@/lib/survey-storage"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
	Select,
	SelectItem,
	SelectLabel,
	SelectValue,
	SelectGroup,
	SelectTrigger,
	SelectContent,
} from "@/components/ui/select"

import type { TreeSurvey, FullTreeSurvey, TreeSurveyShared } from "@/types/TreeSurvey"
import { sendData } from "@/lib/sendData"

export default function TreeSurveyForm() {
	const { toast } = useToast()

	const [formStep, setFormStep] = useState(0)

	const [treeType, setTreeType] = useState<TreeSurveyShared["treeType"]>("")
	const [treeName, setTreeName] = useState<TreeSurveyShared["treeName"]>("")
	const [surveyData, setSurveyData] = useState<TreeSurvey>({
		cobertura: "",
		exposicion: "",
		drenaje: "",
		topografia: "",
		sustrato: "",
		pendiente: "",
		intervencion: "",
		formacion: "",
		coberturaTerrero: "",
		porcentajePorEspecie: "",
		desarrollo: "",
		origen: "",
		estadoSanitario: "",
	})
	const [surveys, setSurveys] = useState<FullTreeSurvey[]>([])

	const addNewSurvey = () => {
		if (Object.values(surveyData).some((value) => value === "")) {
			toast({
				title: "Campos vacíos",
				description: "Por favor, complete todos los campos de la encuesta.",
				variant: "destructive",
				duration: 3000,
			})
			return
		}

		const newSurvey: FullTreeSurvey = {
			surveyData,
			id: Date.now(),
			sharedData: { treeType, treeName },
		}

		const updatedSurveys = [...surveys, newSurvey]
		setSurveys(updatedSurveys)

		setSurveyData({
			cobertura: "",
			exposicion: "",
			drenaje: "",
			topografia: "",
			sustrato: "",
			pendiente: "",
			intervencion: "",
			formacion: "",
			coberturaTerrero: "",
			porcentajePorEspecie: "",
			desarrollo: "",
			origen: "",
			estadoSanitario: "",
		})
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (surveys.length === 0) {
			toast({
				title: "Encuestas vacías",
				description: "Por favor, complete al menos una encuesta.",
				variant: "destructive",
				duration: 300,
			})
			return
		}

		if (Object.values(surveyData).every((value) => value !== "")) {
			addNewSurvey()
		}

		if (navigator.onLine) {
			const res = await sendData(surveys)

			if (!res) {
				await saveSurveysToDB(surveys)
				toast({
					title: "Error al enviar encuestas",
					description: "Ocurrió un error al enviar las encuestas, se han guardado localmente.",
					variant: "destructive",
					duration: 3000,
				})
				return
			}
			toast({
				title: "Encuestas enviadas",
				description: "Hay conexion y las encuestas han sido enviadas exitosamente.",
				duration: 3000,
			})
		} else {
			await saveSurveysToDB(surveys)

			toast({
				title: "Encuestas guardadas localmente",
				description:
					"Las encuestas han sido guardadas localmente y se enviarán cuando haya conexión a internet.",
				duration: 3000,
			})
		}

		setFormStep(0)
		setSurveys([])
		setSurveyData({
			cobertura: "",
			exposicion: "",
			drenaje: "",
			topografia: "",
			sustrato: "",
			pendiente: "",
			intervencion: "",
			formacion: "",
			coberturaTerrero: "",
			porcentajePorEspecie: "",
			desarrollo: "",
			origen: "",
			estadoSanitario: "",
		})
	}

	return (
		<>
			<Card className="h-fit w-full rounded-sm border-none bg-secondary-2-g">
				<CardHeader>
					<CardTitle>
						Datos de árbol {treeName && treeName + " - "} {treeType}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						{formStep === 0 && (
							<div className="grid gap-2 sm:grid-cols-2">
								<div className="grid gap-1.5">
									<Label>Tipo de árbol</Label>
									<Select
										value={treeType}
										onValueChange={(e) => {
											setTreeType(e)
											setTreeName("")
										}}
									>
										<SelectTrigger className="w-full border-none bg-secondary-g">
											<SelectValue placeholder="Selecciona un tipo de árbol" />
										</SelectTrigger>
										<SelectContent className="border-none bg-secondary-g">
											<SelectGroup>
												<SelectLabel>Tipo de árbol</SelectLabel>
												{treeTypes.map((type) => (
													<SelectItem className="focus:bg-secondary-2-g" key={type} value={type}>
														{type.charAt(0).toUpperCase() + type.slice(1)}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>

								{treeType && (
									<div className="grid gap-1.5">
										<Label>Tipo de árbol</Label>
										<Select
											value={treeName}
											onValueChange={(e) => {
												setTreeName(e)
											}}
										>
											<SelectTrigger className="w-full border-none bg-secondary-g">
												<SelectValue placeholder="Selecciona un nombre de árbol" />
											</SelectTrigger>
											<SelectContent className="border-none bg-secondary-g">
												<SelectGroup>
													<SelectLabel>Nombre de árbol</SelectLabel>
													{treeNames[treeType as keyof typeof treeNames].map((name) => (
														<SelectItem className="focus:bg-secondary-2-g" key={name} value={name}>
															{name.charAt(0).toUpperCase() + name.slice(1)}
														</SelectItem>
													))}
												</SelectGroup>
											</SelectContent>
										</Select>
									</div>
								)}
							</div>
						)}

						{formStep === 1 && (
							<div className="grid gap-2 sm:grid-cols-2">
								{contentSurveyOptions.map((option) => (
									<Select
										key={option.id}
										value={surveyData[option.id as keyof TreeSurvey]}
										onValueChange={(e) => {
											setSurveyData({ ...surveyData, [option.id]: e })
										}}
									>
										<SelectTrigger className="w-full min-w-full rounded-sm border-none bg-secondary-g">
											<SelectValue placeholder={option.placeholder} />
										</SelectTrigger>
										<SelectContent className="border-none bg-secondary-g">
											<SelectGroup>
												<SelectLabel>{option.label}</SelectLabel>
												{option.options.map((option) => (
													<SelectItem
														className="focus:bg-secondary-2-g"
														key={option}
														value={option}
													>
														{option}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
								))}
							</div>
						)}

						<div className="mt-4 flex flex-wrap items-end justify-center gap-2">
							{formStep === 1 && (
								<>
									<Button
										size={"lg"}
										type="button"
										className="mt-4 bg-primary-g px-10"
										onClick={() => addNewSurvey()}
									>
										Agregar Encuesta
									</Button>
									<Button size={"lg"} type="submit" className="bg-primary-g px-10">
										Finalizar
									</Button>
								</>
							)}

							{formStep === 0 && (
								<Button
									size={"lg"}
									type="button"
									disabled={!treeType || !treeName}
									className="mt-4 bg-primary-g px-10"
									onClick={() => setFormStep(1)}
								>
									Continuar
								</Button>
							)}
						</div>
					</form>
				</CardContent>
			</Card>
		</>
	)
}
