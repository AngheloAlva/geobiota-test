import { PROJECTS } from "@/lib/consts/projects"
import { PLOTS } from "@/lib/consts/plots"
import Image from "next/image"
import Link from "next/link"

import TextWithIcon from "@/components/shared/TextWithIcon"
import Card from "@/components/shared/Card"
import Logo from "@/components/icons/Logo"
import {
	IoSyncOutline,
	IoPersonOutline,
	IoResizeOutline,
	IoLocationOutline,
	IoPartlySunnyOutline,
	IoArrowForwardCircleOutline,
	IoArrowBackOutline,
} from "react-icons/io5"

export default async function ProjectPage({
	params,
}: {
	params: Promise<{ projectId: string }>
}): Promise<React.ReactElement> {
	const { projectId } = await params

	const project = PROJECTS.find((project) => project.id === projectId)

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

				<div className="flex h-[60dvh] w-full flex-col bg-primary-g sm:h-screen sm:w-1/2">
					<Link href="/" className="mt-4 flex items-center gap-2 pl-2 text-white hover:underline">
						<IoArrowBackOutline className="h-6 w-auto text-white" />
						<p className="text-white">Volver</p>
					</Link>

					<Card title={project?.name} className="p-4 sm:pb-10 sm:pt-6">
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

					<div className="h-full bg-secondary-2-g">
						<section className="flex h-fit w-full flex-col p-4 text-white">
							<h2 className="text-2xl font-bold">Parcelas</h2>
							<p className="font-medium">{`Listado de todas las parcelas del proyecto ${project?.name}`}</p>

							<div className="mt-4 flex w-full flex-col gap-2">
								{PLOTS.filter((plot) => plot.projectId === projectId).map((plot) => (
									<Link
										href={`/project/${projectId}/parcela/${plot.id}`}
										key={plot.id}
										className="flex justify-between gap-0.5 rounded-sm bg-primary-g px-4 py-3 shadow transition-all hover:brightness-90"
									>
										<div className="flex flex-col gap-1">
											<p className="text-lg font-semibold">{plot.name}</p>

											{/* <TextWithIcon icon={<IoImagesOutline />} text={plot.images?.length ?? 0} /> */}
											<TextWithIcon
												icon={<IoLocationOutline />}
												text={`lat: ${plot.gps.latitude}, long: ${plot.gps.longitude}`}
											/>
											<TextWithIcon
												icon={<IoResizeOutline />}
												text={`${plot.dimensions.width}mts x ${plot.dimensions.length}mts`}
											/>
										</div>

										<div className="flex flex-col items-end justify-end">
											{/* <p
											className={cn("flex items-center gap-2 text-red-500", {
												"text-green-500": plot.synchronized,
											})}
										>
											<IoSyncOutline /> {plot.synchronized ? "Sincronizado" : "No sincronizado"}
										</p> */}

											<div className="flex gap-2">
												<IoArrowForwardCircleOutline className="text-3xl text-neutral-300 transition-colors hover:text-white" />
											</div>
										</div>
									</Link>
								))}
							</div>
						</section>
					</div>
				</div>
			</div>
		</main>
	)
}
