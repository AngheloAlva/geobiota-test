import { FullTreeSurvey } from "@/types/TreeSurvey"

let db: IDBDatabase | null = null

async function initDB() {
	if (typeof window === "undefined") return null

	return new Promise<IDBDatabase>((resolve, reject) => {
		const request = indexedDB.open("TreeSurveyDB", 1)

		request.onerror = () => reject("Error opening database")

		request.onsuccess = (event) => {
			db = (event.target as IDBOpenDBRequest).result
			resolve(db)
		}

		request.onupgradeneeded = (event) => {
			const db = (event.target as IDBOpenDBRequest).result
			db.createObjectStore("surveys", { keyPath: "id", autoIncrement: true })
		}
	})
}

export async function saveSurvey(survey: FullTreeSurvey): Promise<number> {
	if (!db) await initDB()
	if (!db) throw new Error("Database not initialized")

	return new Promise((resolve, reject) => {
		if (!db) throw new Error("Database not initialized")

		const transaction = db.transaction(["surveys"], "readwrite")
		const store = transaction.objectStore("surveys")
		const request = store.add(survey)

		request.onerror = () => reject("Error adding survey")
		request.onsuccess = () => resolve(request.result as number)
	})
}

export async function getAllSurveys(): Promise<FullTreeSurvey[]> {
	if (!db) await initDB()
	if (!db) return []

	return new Promise((resolve, reject) => {
		if (!db) throw new Error("Database not initialized")

		const transaction = db.transaction(["surveys"], "readonly")
		const store = transaction.objectStore("surveys")
		const request = store.getAll()

		request.onerror = () => reject("Error getting surveys")
		request.onsuccess = () => resolve(request.result)
	})
}

export async function deleteSurvey(id: number): Promise<void> {
	if (!db) await initDB()
	if (!db) throw new Error("Database not initialized")

	return new Promise((resolve, reject) => {
		if (!db) throw new Error("Database not initialized")

		const transaction = db.transaction(["surveys"], "readwrite")
		const store = transaction.objectStore("surveys")
		const request = store.delete(id)

		request.onerror = () => reject("Error deleting survey")
		request.onsuccess = () => resolve()
	})
}

export async function clearSurveys(): Promise<void> {
	if (!db) await initDB()
	if (!db) throw new Error("Database not initialized")

	return new Promise((resolve, reject) => {
		if (!db) throw new Error("Database not initialized")

		const transaction = db.transaction(["surveys"], "readwrite")
		const store = transaction.objectStore("surveys")
		const request = store.clear()

		request.onerror = () => reject("Error clearing surveys")
		request.onsuccess = () => resolve()
	})
}
