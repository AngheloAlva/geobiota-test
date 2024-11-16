import Dexie, { type EntityTable } from "dexie"

import type { Project, Plot, Coverage, Species, Synchronization } from "./types"

const db = new Dexie("Geobiota") as Dexie & {
	projects: EntityTable<Project, "id">
	plots: EntityTable<Plot, "id">
	coverages: EntityTable<Coverage, "id">
	species: EntityTable<Species, "id">
	synchronizations: EntityTable<Synchronization, "id">
}

db.version(1).stores({
	projects: "++id, name, year, client, createdAt, seasonality, synchronized",
	plots: "++id, name, area, dimensions, createdAt, projectId, synchronized",
	coverages:
		"++id, area, plotId, specie, createdAt, coverage, diameter1, diameter2, numberOfCopies, synchronized",
	species: "++id, name, lifeForm, observations, coverageRange",
	synchronizations: "++id, table, status, error, createdAt, registerId",
})

export { db }
