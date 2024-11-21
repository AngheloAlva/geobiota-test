import type { COT } from "@/db/types"

export const sendData = async (cot: COT) => {
	try {
		const body = {
			...cot,
			id: cot.id.toString(),
			plotId: cot.plotId.toString(),
		}

		const response = await fetch(
			"https://prod-31.brazilsouth.logic.azure.com:443/workflows/4351ccfcbdff44f39f2aa09c3b2aa54c/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=hL45qx1L3SLKKXkvEjtaRq7y-IZwzIfyddSMbr_JyzQ",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(cot),
			}
		)

		if (!response.ok) {
			throw new Error("Error al enviar los datos")
		}

		return true
	} catch (error) {
		console.error(error)
		return false
	}
}
