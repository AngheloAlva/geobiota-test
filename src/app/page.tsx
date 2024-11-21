"use client"

import { getGeolocation } from "@/lib/geolocation"
import { PROJECTS } from "@/lib/consts/projects"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { IoLocation, IoSync, IoWifi } from "react-icons/io5"
import { Button } from "@/components/ui/button"
import Logo from "@/components/icons/Logo"
import { Input } from "@/components/ui/input"
import { db } from "@/db"
import { sendData } from "@/lib/sendData"
import { useToast } from "@/hooks/use-toast"

export default function HomePage() {
	const [online, setOnline] = useState<boolean>(false)
	const [geolocation, setGeolocation] = useState<string>("")
	const [searchTerm, setSearchTerm] = useState<string>("")

	const { toast } = useToast()

	useEffect(() => {
		setOnline(navigator.onLine)

		getGeolocation()
			.then((position) =>
				setGeolocation(position.coords.latitude + ", " + position.coords.longitude)
			)
			.catch((error) => console.log(error))
	}, [])

	const syncData = async () => {
		try {
			const COT = await db.cots.toArray()

			sendData(COT[0])

			toast({
				title: "Sincronización exitosa",
				description: "Los datos han sido sincronizados correctamente",
			})
		} catch (error) {
			console.log(error)

			toast({
				title: "Error al sincronizar",
				description: "Hubo un error al sincronizar los datos",
				variant: "destructive",
			})
		}
	}

	const filteredProjects = PROJECTS.filter((project) =>
		project.name.toLowerCase().includes(searchTerm.toLowerCase())
	)

	return (
		<main className="mx-auto w-full overflow-hidden">
			<div className="flex w-full flex-col sm:flex-row">
				<div className="relative sm:w-1/2 md:w-2/3">
					<Image
						src="/images/home-hero.jpg"
						alt="Logo"
						width={1920}
						height={1080}
						className="h-[40dvh] w-full object-cover sm:h-screen"
					/>

					<Logo className="absolute bottom-4 right-4 h-12 w-auto text-white" />
				</div>

				<div className="flex w-full flex-col sm:h-screen sm:w-1/2">
					<section className="flex h-full w-full flex-col bg-primary-g p-4 pb-10 text-white">
						<h2 className="text-2xl font-bold">Lista de Projectos</h2>
						<p className="text-sm font-medium text-text-dark md:text-base">
							Aquí podrás ver todos los proyectos registrados y acceder a cada uno de ellos.
						</p>

						<Input
							type="text"
							value={searchTerm}
							className="mt-4 rounded border-black/30 bg-black/30 p-2 text-white"
							placeholder="Buscar proyectos..."
							onChange={(e) => setSearchTerm(e.target.value)}
						/>

						<div className="mt-4 flex w-full flex-col gap-4">
							<ul className="flex flex-col gap-2">
								{filteredProjects.map((project) => (
									<li
										key={project.id}
										className="rounded-sm bg-black/30 shadow transition-colors hover:bg-black/50"
									>
										<Link
											href={`/project/${project.id}`}
											className="flex flex-col gap-0.5 px-4 py-3"
										>
											<div className="flex flex-wrap items-center justify-between gap-2">
												<p className="text-lg font-bold">{project.name}</p>
												<p className="text-sm text-neutral-300">{project.client}</p>
											</div>

											<div className="flex flex-wrap items-center justify-between gap-2">
												<p className="text-sm text-neutral-300">{`${project.seasonality} - ${project.year}`}</p>
												<p className="text-sm text-neutral-300">{`ID: ${project.id}`}</p>
											</div>
										</Link>
									</li>
								))}
							</ul>
						</div>
					</section>

					<div className="flex h-fit w-full flex-col gap-4 bg-secondary-2-g px-4 py-10 lg:flex-row">
						<section className="flex w-full flex-col lg:w-1/2">
							<div className="rounded-sm bg-primary-g p-4 text-white">
								<h2 className="text-2xl font-bold">Informacion del dispositivo</h2>

								<div className="my-2 h-px w-full bg-white/40" />

								<div className="mt-4 flex w-full flex-col gap-1">
									<p className="flex items-center gap-2">
										<IoWifi /> {online ? "Conectado" : "Desconectado"}
									</p>
									<p className="flex items-center gap-2">
										<IoLocation /> {geolocation}
									</p>
								</div>
							</div>
						</section>

						<section className="flex w-full flex-col gap-4 lg:w-1/2">
							<div className="rounded-sm bg-primary-g p-4 text-white">
								<h2 className="text-2xl font-bold">Acciones</h2>

								<div className="my-2 h-px w-full bg-white/40" />

								<div className="mt-4 flex w-full flex-col gap-4">
									<Button
										size="lg"
										onClick={syncData}
										className="h-12 w-full bg-black/30 text-base hover:bg-black/50"
									>
										Sincronizar datos <IoSync />
									</Button>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>
		</main>
	)
}
