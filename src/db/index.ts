// TODO: Remove fake-indexeddb

import { indexedDB, IDBKeyRange } from "fake-indexeddb"
import Dexie, { type EntityTable } from "dexie"

import type { Project, Plot, CoveragePlot, Transect, Synchronization, COT } from "./types"

const db = new Dexie("Geobiota", { indexedDB, IDBKeyRange }) as Dexie & {
	projects: EntityTable<Project, "id">
	plots: EntityTable<Plot, "id">
	coveragePlots: EntityTable<CoveragePlot, "id">
	transects: EntityTable<Transect, "id">
	synchronizations: EntityTable<Synchronization, "id">
	cots: EntityTable<COT, "id">
}

db.version(1).stores({
	projects: "++id, name, year, client, status, createdAt, seasonality, synchronized",
	plots:
		"++id, name, status, createdAt, updatedAt, images, projectId, synchronized, dimensions, gps",
	coveragePlots: "++id, plotId, lifeForm, cover, species, createdAt",
	transects: "++id, plotId, totalLongitude, transects, createdAt",
	synchronizations: "++id, table, tries, error, status, createdAt, registerId",
	cots: "++id, plotId, group1, group2, group3, group4",
})

export { db }
