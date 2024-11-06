import { openDB } from "idb"

const DB_NAME = "TreeSurveyAuth"
const STORE_NAME = "auth"

async function initDB() {
	return openDB(DB_NAME, 1, {
		upgrade(db) {
			db.createObjectStore(STORE_NAME)
		},
	})
}

export async function login(username: string) {
	// Aquí deberías hacer una llamada a tu API de autenticación
	// Por ahora, simularemos una autenticación exitosa
	const token = `fake-jwt-token-${username}`

	const db = await initDB()
	await db.put(STORE_NAME, token, "authToken")

	return token
}

export async function logout() {
	const db = await initDB()
	await db.delete(STORE_NAME, "authToken")
}

export async function getAuthToken() {
	const db = await initDB()
	return db.get(STORE_NAME, "authToken")
}

export async function isAuthenticated() {
	const token = await getAuthToken()
	return !!token
}
