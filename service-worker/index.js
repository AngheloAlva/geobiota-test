const STORAGE_KEY = "treeSurveys"
const POWER_AUTOMATE_URL =
	"https://prod-31.brazilsouth.logic.azure.com:443/workflows/4351ccfcbdff44f39f2aa09c3b2aa54c/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=hL45qx1L3SLKKXkvEjtaRq7y-IZwzIfyddSMbr_JyzQ"

self.addEventListener("sync", (event) => {
	if (event.tag === "sync-surveys") {
		event.waitUntil(syncSurveys())
	}
})

async function syncSurveys() {
	const surveys = await getSurveysFromDB()

	if (surveys.length === 0) return

	try {
		const response = await fetch(POWER_AUTOMATE_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(surveys),
		})

		if (response.ok) {
			await clearSurveysFromDB()
			console.log("Surveys synced successfully")
		} else {
			throw new Error("Failed to sync surveys")
		}
	} catch (error) {
		console.error("Error syncing surveys:", error)
	}
}

// Funciones para trabajar con IndexedDB
function openDB() {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open("SurveyDB", 1)

		request.onupgradeneeded = (event) => {
			const db = event.target.result
			db.createObjectStore(STORAGE_KEY, { keyPath: "id" })
		}

		request.onsuccess = (event) => {
			resolve(event.target.result)
		}

		request.onerror = (event) => {
			reject(event.target.error)
		}
	})
}

function getSurveysFromDB() {
	return new Promise(async (resolve, reject) => {
		const db = await openDB()
		const transaction = db.transaction(STORAGE_KEY, "readonly")
		const store = transaction.objectStore(STORAGE_KEY)
		const request = store.getAll()

		request.onsuccess = (event) => {
			resolve(event.target.result)
		}

		request.onerror = (event) => {
			reject(event.target.error)
		}
	})
}

function clearSurveysFromDB() {
	return new Promise(async (resolve, reject) => {
		const db = await openDB()
		const transaction = db.transaction(STORAGE_KEY, "readwrite")
		const store = transaction.objectStore(STORAGE_KEY)
		const request = store.clear()

		request.onsuccess = () => {
			resolve()
		}

		request.onerror = (event) => {
			reject(event.target.error)
		}
	})
}
