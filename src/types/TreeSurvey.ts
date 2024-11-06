export interface FullTreeSurvey {
	sharedData: TreeSurveyShared
	surveyData: TreeSurvey
}

export interface TreeSurveyShared {
	treeType: string
	treeName: string
}

export interface TreeSurvey {
	cobertura: string
	exposicion: string
	drenaje: string
	topografia: string
	sustrato: string
	pendiente: string
	intervencion: string
	formacion: string
	coberturaTerrero: string
	porcentajePorEspecie: string
	desarrollo: string
	origen: string
	estadoSanitario: string
}
