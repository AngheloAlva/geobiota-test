"use client"

import { getSurveysFromDB, saveSurveysToDB } from "@/lib/survey-storage"
import { useToast } from "@/hooks/use-toast"
import { sendData } from "@/lib/sendData"
import { useEffect } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function HomePage() {
	const { toast } = useToast()

	useEffect(() => {
		const syncSurveys = async () => {
			const surveys = await getSurveysFromDB()
			if (surveys.length > 0) {
				try {
					await sendData(surveys)
					toast({
						title: "Datos sincronizados",
						description: "Los datos se han enviado correctamente.",
						duration: 3000,
					})

					await saveSurveysToDB([])
				} catch (error) {
					console.error("Error al enviar los datos:", error)
					toast({
						title: "Error de sincronización",
						description: "No se pudieron enviar los datos. Se intentará nuevamente más tarde.",
						variant: "destructive",
						duration: 3000,
					})
				}
			}
		}

		if ("serviceWorker" in navigator && "SyncManager" in window) {
			navigator.serviceWorker
				.register("/sw.js")
				.then((registration) => {
					console.log("Service Worker registered with scope:", registration.scope)

					return Notification.requestPermission().then((permission) => {
						if (permission === "granted") {
							return (registration as ServiceWorkerRegistration & { sync: any }).sync.register(
								"sync-surveys"
							)
						} else {
							throw new Error("Notification permission denied")
						}
					})
				})
				.then(() => {
					console.log("Sync registered")
				})
				.catch((error) => {
					console.error("Service Worker registration or Sync registration failed:", error)
					void syncSurveys()
				})
		} else {
			void syncSurveys()
		}
	}, [])

	return (
		<main className="flex h-full w-full items-center justify-center overflow-hidden bg-primary-g px-4 py-16">
			<section className="mx-auto flex h-full w-full max-w-screen-md flex-col items-center justify-center gap-4">
				<Link href={"/forms/tree-survey-form"} className="w-full">
					<Button className="h-auto w-full bg-secondary-2-g py-3 text-base font-bold">
						Agregar datos
					</Button>
				</Link>

				<div>
					<Link href={"/survey-list"} className="w-full">
						<Button className="h-auto w-full bg-secondary-2-g py-3 text-base font-bold">
							Datos guardados
						</Button>
					</Link>
					<p className="mt-1 text-center text-sm text-white opacity-85">
						Estos datos se guardan en el navegador y se sincronizan con el servidor cuando hay
						conexión a internet.
					</p>
				</div>
			</section>
		</main>
	)
}
