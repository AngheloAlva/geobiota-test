export const getGeolocation = (): Promise<GeolocationPosition> => {
	return new Promise((resolve, reject) => {
		if (!navigator.geolocation) {
			reject(new Error("Geolocalización no soportada por el navegador"))
		} else {
			navigator.geolocation.getCurrentPosition(resolve, reject)
		}
	})
}
