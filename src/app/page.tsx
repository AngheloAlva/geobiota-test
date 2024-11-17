"use client"

import { getGeolocation } from "@/lib/geolocation"
import { PROJECTS } from "@/lib/consts/projects"
import { useEffect, useState } from "react"
import Link from "next/link"

import { IoAdd, IoLocation, IoSync, IoWifi } from "react-icons/io5"
import { Button } from "@/components/ui/button"
import Card from "@/components/shared/Card"

export default function HomePage() {
	const [online, setOnline] = useState<boolean>(false)
	const [geolocation, setGeolocation] = useState<string>("")

	useEffect(() => {
		setOnline(navigator.onLine)

		getGeolocation()
			.then((position) =>
				setGeolocation(position.coords.latitude + ", " + position.coords.longitude)
			)
			.catch((error) => console.log(error))
	}, [])

	return (
		<main className="mx-auto grid w-full max-w-screen-lg grid-cols-1 items-center justify-center gap-x-4 gap-y-6 overflow-hidden px-4 py-24 md:grid-cols-2 md:px-6 xl:px-0">
			<Card
				title="Lista de Projectos"
				description="Aquí podrás ver todos los proyectos registrados y acceder a cada uno de ellos."
			>
				<ul className="flex flex-col gap-4">
					{PROJECTS.map((project) => (
						<li
							key={project.id}
							className="rounded-2xl bg-black/30 transition-colors hover:bg-black/50"
						>
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
			</Card>

			<div className="flex h-full w-full flex-col gap-x-4 gap-y-6">
				<Card title="Información">
					{/* TODO: Add information about the app, like internet connection, service worker, space used, permissions, etc. */}
					<p className="flex items-center gap-2">
						<IoWifi /> {online ? "Conectado" : "Desconectado"}
					</p>
					<p className="flex items-center gap-2">
						<IoLocation /> {geolocation}
					</p>
				</Card>

				<Card title="Acciones">
					{/* TODO: Add more actions, like delete data already synchronized, theme, etc. */}
					<Link href="/cot">
						<Button className="h-12 w-full bg-black/30 text-base hover:bg-black/50" size="lg">
							Crear COT <IoAdd />
						</Button>
					</Link>

					<Button className="h-12 w-full bg-black/30 text-base hover:bg-black/50" size="lg">
						Sincronizar datos <IoSync />
					</Button>
				</Card>
			</div>
		</main>
	)
}
