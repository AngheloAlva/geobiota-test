export interface Project {
	id: string
	name: string
	year: number
	client: string
	createdAt: Date
	seasonality: string
	synchronized: boolean
}

export interface Plot {
	id: string
	name: string
	area: number
	dimensions: {
		width: number
		length: number
	}
	createdAt: Date
	projectId: string
	synchronized: boolean
}

export interface Coverage {
	id: string
	area: number
	plotId: string
	specie: string
	createdAt: Date
	coverage: number
	diameter1: number
	diameter2: number
	synchronized: boolean
	numberOfCopies: number
}

export interface Species {
	id: string
	name: string
	lifeForm: string
	observations: string
	coverageRange: string
}

export interface Synchronization {
	id: string
	table: string
	error: string
	status: string
	createdAt: Date
	registerId: string
}