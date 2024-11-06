"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect } from "react"

export default function HomePage() {
	useEffect(() => {
		if ("serviceWorker" in navigator && "SyncManager" in window) {
			navigator.serviceWorker
				.register("/sw.js")
				.then((registration) => {
					console.log("Service Worker registered with scope:", registration.scope)

					// Solicitar permisos de notificación
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
				})
		}
	}, [])

	return (
		<main className="h-screen w-full overflow-hidden bg-primary-g px-4 py-4">
			<section className="flex h-full w-full flex-col items-center justify-center gap-4">
				<Link href={"/forms/tree-survey-form"} className="w-full">
					<Button className="h-auto w-full bg-secondary-2-g py-3 text-base font-bold">
						Nueva encuesta
					</Button>
				</Link>

				<Link href={"/survey-list"} className="w-full">
					<Button className="h-auto w-full bg-secondary-2-g py-3 text-base font-bold">
						Datos guardados
					</Button>
				</Link>
			</section>
		</main>
	)
}
