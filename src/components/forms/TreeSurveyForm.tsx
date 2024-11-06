"use client"

import { treeNames, treeTypes, contentSurveyOptions } from "@/lib/consts"
import { useState } from "react"
import { saveSurveysToDB } from "@/lib/survey-storage"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
	Select,
	SelectItem,
	SelectLabel,
	SelectValue,
	SelectGroup,
	SelectTrigger,
	SelectContent,
} from "@/components/ui/select"
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import type { TreeSurvey, FullTreeSurvey, TreeSurveyShared } from "@/types/TreeSurvey"

export default function TreeSurveyForm() {
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

	const [error, setError] = useState<string | null>(null)

	const addNewSurvey = () => {
		if (Object.values(surveyData).some((value) => value === "")) {
			setError("Por favor, complete todos los campos de la encuesta.")
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

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		console.log("Form submitted")
	}

	const handleFinish = async () => {
		if (surveys.length === 0) {
			setError("No hay encuestas para enviar.")
			return
		}

		await saveSurveysToDB(surveys)
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

		alert("Encuestas enviadas exitosamente.")
	}

	return (
		<>
			<Card className="h-full w-full rounded-sm border-none bg-secondary-2-g">
				<CardHeader>
					<CardTitle>
						Encuesta de árbol {treeName && treeName + " - "} {treeType}
					</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						{formStep === 0 && (
							<>
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
												<SelectItem
													className="focus:bg-secondary-2-g focus:text-white"
													key={type}
													value={type}
												>
													{type.charAt(0).toUpperCase() + type.slice(1)}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>

								{treeType && (
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
													<SelectItem
														className="focus:bg-secondary-2-g focus:text-white"
														key={name}
														value={name}
													>
														{name.charAt(0).toUpperCase() + name.slice(1)}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
								)}
							</>
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
										<SelectTrigger className="w-full rounded-sm border-none bg-secondary-g">
											<SelectValue placeholder={option.placeholder} />
										</SelectTrigger>
										<SelectContent className="border-none bg-secondary-g">
											<SelectGroup>
												<SelectLabel>{option.label}</SelectLabel>
												{option.options.map((option) => (
													<SelectItem
														className="focus:bg-secondary-2-g focus:text-white"
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

						<div className="flex flex-wrap items-end justify-center gap-2">
							{formStep === 1 && (
								<>
									<Button
										size={"lg"}
										type="button"
										className="mt-4 bg-primary-g"
										onClick={() => addNewSurvey()}
									>
										Agregar Encuesta
									</Button>
									<Button
										size={"lg"}
										type="button"
										className="mt-4 bg-primary-g"
										onClick={handleFinish}
									>
										Finalizar
									</Button>
								</>
							)}

							{formStep === 0 && (
								<Button
									size={"lg"}
									type="button"
									className="mt-4 bg-primary-g"
									onClick={() => setFormStep(1)}
								>
									Continuar
								</Button>
							)}
						</div>
					</form>
				</CardContent>
			</Card>

			<AlertDialog open={!!error} onOpenChange={() => setError(null)}>
				<AlertDialogContent className="w-11/12 rounded-sm">
					<AlertDialogHeader>
						<AlertDialogTitle>{error}</AlertDialogTitle>
						<AlertDialogDescription>Por favor, intente de nuevo.</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cerrar</AlertDialogCancel>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}
