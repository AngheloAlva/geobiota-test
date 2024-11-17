export interface Project {
	id: string
	name: string
	year: number
	client: string
	status: string
	createdAt: Date
	seasonality: string
	synchronized: boolean
}

export interface Plot {
	id: string
	name: string
	status: string
	createdAt: Date
	updatedAt: Date
	images?: string[]
	projectId: string
	synchronized: boolean
	dimensions: {
		width: number
		length: number
	}
	gps: {
		altitude?: number
		latitude: number
		longitude: number
	}
}

export interface COT {
	id: string
	plotId: string
	group1: {
		quadrille: string
		date: Date
		hour: number
		gps: {
			latitude: number
			longitude: number
			altitude?: number
		}
	}
	group2: {
		formation: string
		cover: string
		spsTerrain: string[]
	}
	group3: {
		exposition: string
		drainage: string
		topography: string
		susbtract: string
		slope: number
		intervention: string
	}
	group4?: {
		development?: string
		origin?: string
		sanitaryStatus?: string
	}
}

export interface Transect {
	id: string
	plotId: string
	totalLongitude: number
	transects: {
		unitStart: number
		unitEnd: number
		specie: string
		participation: number
	}[]
}

export interface CoveragePlot {
	id: string
	plotId: string
	lifeForm: string
	cover: string
	species: {
		name: string
		diameter1: number
		diameter2: number
		area: number
	}[]
}

export interface Synchronization {
	id: string
	table: string
	tries: number
	error?: string
	status: string
	createdAt: Date
	registerId: string
}
