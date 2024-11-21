"use client"

import { PROJECTS } from "@/lib/consts/projects"
import { useEffect, useState } from "react"
import { PLOTS } from "@/lib/consts/plots"
import Image from "next/image"
import Link from "next/link"
import { db } from "@/db"

import { Button } from "@/components/ui/button"
import Card from "@/components/shared/Card"
import Logo from "@/components/icons/Logo"
import {
	IoSyncOutline,
	IoLocationOutline,
	IoPartlySunnyOutline,
	IoPersonOutline,
	IoAddOutline,
	IoArrowBackOutline,
} from "react-icons/io5"

import type { COT, Plot, Project, Transect } from "@/db/types"

export default function ParcelaPage({
	params,
}: {
	params: Promise<{ projectId: string; parcelaId: string }>
}): React.ReactElement {
	const [cot, setCot] = useState<COT[]>([])
	const [parcelaId, setParcelaId] = useState<string>("")
	const [parcela, setParcela] = useState<Plot | null>(null)
	const [transects, setTransects] = useState<Transect[]>([])
	const [project, setProject] = useState<Project | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			if (typeof window !== "undefined") {
				const { projectId, parcelaId } = await params

				const projectData = PROJECTS.find((project) => project.id === projectId)

				setProject(projectData ?? null)
				setParcelaId(parcelaId)

				const cotData = await db.cots.where("plotId").equals(parcelaId).toArray()
				const transectsData = await db.transects.where("plotId").equals(parcelaId).toArray()

				setCot(cotData)
				setTransects(transectsData)

				const parcelaData = PLOTS.find((plot) => plot.id === parcelaId)
				setParcela(parcelaData ?? null)
			}
		}

		fetchData()
	}, [params])

	return (
		<main className="mx-auto w-full overflow-x-hidden">
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

				<div className="flex h-[60dvh] w-full flex-col bg-primary-g sm:h-screen sm:w-1/2">
					<Link
						href={`/project/${project?.id}`}
						className="mt-4 flex items-center gap-2 pl-2 text-white hover:underline"
					>
						<IoArrowBackOutline className="h-6 w-auto text-white" />
						<p className="text-white">Volver</p>
					</Link>

					<div className="flex flex-wrap gap-x-8 gap-y-4 p-4 sm:pb-10 sm:pt-6">
						<Card title={project?.name} className="w-fit">
							<p className="flex items-center gap-2 text-neutral-300">
								<IoPersonOutline /> {project?.client}
							</p>
							<p className="flex items-center gap-2 text-neutral-300">
								<IoPartlySunnyOutline /> {project?.seasonality} - {project?.year}
							</p>
							<p className="flex items-center gap-2 text-neutral-300">
								<IoSyncOutline />
								{project?.synchronized ? "Sincronizado" : "No sincronizado"}
							</p>
						</Card>

						<Card title={parcela?.name} className="w-fit">
							<p className="flex items-center gap-2 text-neutral-300">
								<IoLocationOutline /> {parcela?.gps.latitude}, {parcela?.gps.longitude}
							</p>
							<p className="flex items-center gap-2 text-neutral-300">
								<IoPartlySunnyOutline /> {parcela?.dimensions.width}mts x{" "}
								{parcela?.dimensions.length}mts
							</p>
							<p className="flex items-center gap-2 text-neutral-300">
								<IoSyncOutline />
								{parcela?.synchronized ? "Sincronizado" : "No sincronizado"}
							</p>
						</Card>
					</div>

					<div className="h-full bg-secondary-2-g">
						<div className="flex flex-wrap gap-x-8 gap-y-4 p-4 sm:py-10">
							<Card title="COT" className="rounded-sm bg-primary-g px-4 py-3 shadow">
								{cot.length > 0 ? (
									<>
										<p className="text-sm text-neutral-400">COT agregado</p>

										<p className="text-sm text-neutral-400">Grupo 1</p>
										<p className="text-sm text-neutral-400">
											{new Date(cot[0].group1.date).toLocaleDateString()}
										</p>
										<p className="text-sm text-neutral-400">{cot[0].group1.hour}</p>

										<Link href={`/project/${project?.id}/parcela/${parcelaId}/cot`}>
											<Button size={"lg"} className="w-full bg-secondary-2-g text-base text-white">
												Editar COT
											</Button>
										</Link>

										<Link href={`/project/${project?.id}/parcela/${parcelaId}/forma-de-vida`}>
											<Button size={"lg"} className="w-full bg-secondary-2-g text-base text-white">
												Forma de vida <IoAddOutline />
											</Button>
										</Link>
									</>
								) : (
									<>
										<Link href={`/project/${project?.id}/parcela/${parcelaId}/cot`}>
											<Button size={"lg"} className="w-full bg-secondary-2-g text-base text-white">
												Agregar COT <IoAddOutline />
											</Button>
										</Link>

										<Link href={`/project/${project?.id}/parcela/${parcelaId}/forma-de-vida`}>
											<Button size={"lg"} className="w-full bg-secondary-2-g text-base text-white">
												Forma de vida <IoAddOutline />
											</Button>
										</Link>
									</>
								)}
							</Card>

							<Card title="Transectos" className="rounded-sm bg-primary-g px-4 py-3 shadow">
								{transects.length > 0 ? (
									<>
										<p className="text-sm text-neutral-400">Transectos agregados</p>
									</>
								) : (
									<>
										<Link href={`/project/${project?.id}/parcela/${parcelaId}/transectos`}>
											<Button className="w-full bg-secondary-2-g text-base text-white" size={"lg"}>
												Agregar Transectos <IoAddOutline />
											</Button>
										</Link>
									</>
								)}
							</Card>

							<Card
								title="Parcela de cobertura"
								className="rounded-sm bg-primary-g px-4 py-3 shadow"
							>
								<Link href={`/project/${project?.id}/parcela/${parcelaId}/cobertura`}>
									<Button className="w-full bg-secondary-2-g text-base text-white" size={"lg"}>
										Agregar Parcela de cobertura <IoAddOutline />
									</Button>
								</Link>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}
