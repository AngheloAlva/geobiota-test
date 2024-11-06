"use client"

import { getAllSurveys } from "@/lib/survey-storage"
import type { FullTreeSurvey } from "@/types/TreeSurvey"
import { useEffect, useState } from "react"

export default function SurveyListPage(): React.ReactElement {
	const [surveys, setSurveys] = useState<FullTreeSurvey[]>([])

	useEffect(() => {
		const loadSurveys = async () => {
			if (typeof window !== "undefined") {
				const loadedSurveys = await getAllSurveys()
				setSurveys(loadedSurveys)
			}
		}
		loadSurveys()
	}, [])

	return (
		<div className="flex flex-col gap-2">
			{surveys.map(({ sharedData, surveyData }) => (
				<div key={sharedData.treeName} className="border p-2">
					<h2>{sharedData.treeName}</h2>
					<p>{sharedData.treeType}</p>
					<p>{surveyData.cobertura}</p>
					<p>{surveyData.exposicion}</p>
					<p>{surveyData.drenaje}</p>
					<p>{surveyData.topografia}</p>
					<p>{surveyData.sustrato}</p>
					<p>{surveyData.pendiente}</p>
					<p>{surveyData.intervencion}</p>
					<p>{surveyData.formacion}</p>
					<p>{surveyData.coberturaTerrero}</p>
					<p>{surveyData.porcentajePorEspecie}</p>
					<p>{surveyData.desarrollo}</p>
					<p>{surveyData.origen}</p>
					<p>{surveyData.estadoSanitario}</p>
				</div>
			))}
		</div>
	)
}
