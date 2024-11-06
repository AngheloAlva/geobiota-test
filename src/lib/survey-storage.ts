import { FullTreeSurvey } from "@/types/TreeSurvey"

// indexedDB.js
const DB_NAME = "SurveyDB"
const DB_VERSION = 1
const STORAGE_KEY = "treeSurveys"

function openDB() {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION)

		request.onupgradeneeded = (event) => {
			const db = (event.target as IDBOpenDBRequest).result
			db.createObjectStore(STORAGE_KEY, { keyPath: "id" })
		}

		request.onsuccess = (event) => {
			resolve((event.target as IDBRequest).result as FullTreeSurvey[])
		}

		request.onerror = (event) => {
			reject((event.target as IDBOpenDBRequest).error)
		}
	})
}

export function saveSurveysToDB(surveys: FullTreeSurvey[]): Promise<void> {
	return new Promise(async (resolve, reject) => {
		const db = (await openDB()) as IDBDatabase
		const transaction = db.transaction(STORAGE_KEY, "readwrite")
		const store = transaction.objectStore(STORAGE_KEY)

		surveys.forEach((survey) => {
			store.put(survey)
		})

		transaction.oncomplete = () => {
			resolve()
		}

		transaction.onerror = (event) => {
			reject((event.target as IDBOpenDBRequest).error)
		}
	})
}

export function getSurveysFromDB(): Promise<FullTreeSurvey[]> {
	return new Promise(async (resolve, reject) => {
		const db = (await openDB()) as IDBDatabase
		const transaction = db.transaction(STORAGE_KEY, "readonly")
		const store = transaction.objectStore(STORAGE_KEY)
		const request = store.getAll()

		request.onsuccess = (event) => {
			resolve((event.target as IDBRequest).result as FullTreeSurvey[])
		}

		request.onerror = (event) => {
			reject((event.target as IDBOpenDBRequest).error)
		}
	}) as Promise<FullTreeSurvey[]>
}

export function clearSurveysFromDB() {
	return new Promise<void>(async (resolve, reject) => {
		const db = (await openDB()) as IDBDatabase
		const transaction = db.transaction(STORAGE_KEY, "readwrite")
		const store = transaction.objectStore(STORAGE_KEY)
		const request = store.clear()

		request.onsuccess = () => {
			resolve()
		}

		request.onerror = (event) => {
			reject((event.target as IDBOpenDBRequest).error)
		}
	})
}
