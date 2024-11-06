"use client"

import type { FullTreeSurvey } from "@/types/TreeSurvey"
import { useEffect, useState } from "react"
import { getSurveysFromDB } from "@/lib/survey-storage"

export default function SurveyListPage(): React.ReactElement {
	const [surveys, setSurveys] = useState<FullTreeSurvey[]>([])

	useEffect(() => {
		const fetchSurveys = async () => {
			const savedSurveys = await getSurveysFromDB()
			setSurveys(savedSurveys)
		}

		fetchSurveys()
	}, [])

	return (
		<div className="flex flex-col gap-2">
			{surveys.map(({ sharedData, surveyData, id }) => (
				<div key={id} className="rounded-sm bg-secondary-g p-2">
					<h2 className="mb-2 font-bold">
						{sharedData.treeName} - {sharedData.treeType}
					</h2>
					<p className="font-semibold">
						Cobertura: <span className="font-normal">{surveyData.cobertura}</span>
					</p>
					<p className="font-semibold">
						Exposicion: <span className="font-normal">{surveyData.exposicion}</span>
					</p>
					<p className="font-semibold">
						Drenaje: <span className="font-normal">{surveyData.drenaje}</span>
					</p>
					<p className="font-semibold">
						Topografia: <span className="font-normal">{surveyData.topografia}</span>
					</p>
					<p className="font-semibold">
						Sustrato: <span className="font-normal">{surveyData.sustrato}</span>
					</p>
					<p className="font-semibold">
						Pendiente: <span className="font-normal">{surveyData.pendiente}</span>
					</p>
					<p className="font-semibold">
						Intervencion: <span className="font-normal">{surveyData.intervencion}</span>
					</p>
					<p className="font-semibold">
						Formacion: <span className="font-normal">{surveyData.formacion}</span>
					</p>
					<p className="font-semibold">
						Cobertura Terrero: <span className="font-normal">{surveyData.coberturaTerrero}</span>
					</p>
					<p className="font-semibold">
						Porcentaje por Especie:{" "}
						<span className="font-normal">{surveyData.porcentajePorEspecie}</span>
					</p>
					<p className="font-semibold">
						Desarrollo: <span className="font-normal">{surveyData.desarrollo}</span>
					</p>
					<p className="font-semibold">
						Origen: <span className="font-normal">{surveyData.origen}</span>
					</p>
					<p className="font-semibold">
						Estado Sanitario: <span className="font-normal">{surveyData.estadoSanitario}</span>
					</p>
				</div>
			))}
		</div>
	)
}
