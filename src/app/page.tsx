"use client"

// import { useToast } from "@/hooks/use-toast"
import { PROJECTS } from "@/lib/consts/projects"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { IoMdSync } from "react-icons/io"

export default function HomePage() {
	// const { toast } = useToast()

	// useEffect(() => {
	// 	const syncSurveys = async () => {
	// 		const surveys = await getSurveysFromDB()
	// 		if (surveys.length > 0 && navigator.onLine) {
	// 			try {
	// 				await sendData(surveys)
	// 				toast({
	// 					title: "Datos sincronizados",
	// 					description: "Los datos se han enviado correctamente.",
	// 					duration: 3000,
	// 				})

	// 				await clearSurveysFromDB()
	// 			} catch (error) {
	// 				console.error("Error al enviar los datos:", error)
	// 				toast({
	// 					title: "Error de sincronización",
	// 					description: "No se pudieron enviar los datos. Se intentará nuevamente más tarde.",
	// 					variant: "destructive",
	// 					duration: 3000,
	// 				})
	// 			}
	// 		}
	// 	}

	// 	if ("serviceWorker" in navigator && "SyncManager" in window) {
	// 		navigator.serviceWorker
	// 			.register("/sw.js")
	// 			.then((registration) => {
	// 				console.log("Service Worker registered with scope:", registration.scope)

	// 				return Notification.requestPermission().then((permission) => {
	// 					if (permission === "granted") {
	// 						return (registration as ServiceWorkerRegistration & { sync: any }).sync.register(
	// 							"sync-surveys"
	// 						)
	// 					} else {
	// 						throw new Error("Notification permission denied")
	// 					}
	// 				})
	// 			})
	// 			.then(() => {
	// 				console.log("Sync registered")
	// 			})
	// 			.catch((error) => {
	// 				console.error("Service Worker registration or Sync registration failed:", error)
	// 				void syncSurveys()
	// 			})
	// 	} else {
	// 		void syncSurveys()
	// 	}
	// }, [])

	return (
		<main className="mx-auto grid w-full max-w-screen-lg grid-cols-1 items-center justify-center gap-y-6 overflow-hidden px-4 py-24 md:px-6 xl:px-0">
			<section className="flex w-full flex-col rounded-2xl bg-black/30 p-4 text-white">
				<h2 className="text-2xl font-bold">Lista de Projectos</h2>
				<p className="text-sm text-neutral-400">
					Aquí podrás ver todos los proyectos registrados y acceder a cada uno de ellos.
				</p>

				<ul className="mt-4 flex flex-col gap-4">
					{PROJECTS.map((project) => (
						<li key={project.id} className="rounded-2xl bg-black/30">
							<Link href={`/project/${project.id}`} className="flex flex-col gap-2 px-4 py-3">
								<div className="flex flex-wrap items-center justify-between gap-2">
									<p className="text-lg font-bold">{project.name}</p>
									<p className="text-sm text-neutral-400">{project.client}</p>
								</div>

								<div className="flex flex-wrap items-center justify-between gap-2">
									<p className="text-sm text-neutral-400">{`${project.seasonality} - ${project.year}`}</p>
									<p className="text-sm text-neutral-400">{`ID: ${project.id}`}</p>
								</div>
							</Link>
						</li>
					))}
				</ul>
			</section>

			<section className="flex w-full flex-col gap-4 rounded-2xl bg-black/30 p-4 text-white">
				<h2 className="text-2xl font-bold">Información</h2>

				{/* TODO: Add information about the app, like internet connection, service worker, space used, etc. */}
			</section>

			<section className="flex w-full flex-col gap-4 rounded-2xl bg-black/30 p-4 text-white">
				<h2 className="text-2xl font-bold">Información</h2>

				{/* TODO: Add more actions, like delete data already synchronized, theme, etc. */}
				<Button className="h-12 w-full bg-black/30 text-base hover:bg-black/50" size="lg">
					Sincronizar datos <IoMdSync />
				</Button>
			</section>
		</main>
	)
}
