import { PROJECTS } from "@/lib/consts/projects"
import { PLOTS } from "@/lib/consts/plots"
import { cn } from "@/lib/utils"
import Link from "next/link"

import TextWithIcon from "@/components/shared/TextWithIcon"
import Card from "@/components/shared/Card"
import {
	IoSyncOutline,
	IoPersonOutline,
	IoImagesOutline,
	IoResizeOutline,
	IoLocationOutline,
	IoPartlySunnyOutline,
	IoArrowForwardCircleOutline,
} from "react-icons/io5"

export default async function ProjectPage({
	params,
}: {
	params: Promise<{ projectId: string }>
}): Promise<React.ReactElement> {
	const { projectId } = await params

	const project = PROJECTS.find((project) => project.id === projectId)

	return (
		<main className="mx-auto grid w-full max-w-screen-lg grid-cols-1 items-center justify-center gap-x-4 gap-y-6 overflow-hidden px-4 py-24 md:grid-cols-2 md:px-6 xl:px-0">
			<Card title={project?.name}>
				<p className="flex items-center gap-2 text-sm text-neutral-400">
					<IoPersonOutline /> {project?.client}
				</p>
				<p className="flex items-center gap-2 text-sm text-neutral-400">
					<IoPartlySunnyOutline /> {project?.seasonality} - {project?.year}
				</p>
				<p className="flex items-center gap-2 text-sm text-neutral-400">
					<IoSyncOutline />
					{project?.synchronized ? "Sincronizado" : "No sincronizado"}
				</p>
			</Card>

			<Card
				title="Parcelas"
				description={`Listado de todas las parcelas del proyecto ${project?.name}`}
			>
				{PLOTS.filter((plot) => plot.projectId === projectId).map((plot) => (
					<div key={plot.id}>
						<div className="mb-2 h-px w-full bg-white/50" />

						<div className="grid grid-cols-2">
							<div className="flex flex-col gap-1">
								<p className="text-lg font-semibold">{plot.name}</p>

								<TextWithIcon icon={<IoImagesOutline />} text={plot.images?.length ?? 0} />
								<TextWithIcon
									icon={<IoLocationOutline />}
									text={`lat: ${plot.gps.latitude}, long: ${plot.gps.longitude}`}
								/>
								<TextWithIcon
									icon={<IoResizeOutline />}
									text={`${plot.dimensions.width}mts x ${plot.dimensions.length}mts`}
								/>
							</div>

							<div className="flex flex-col items-end justify-between">
								<p
									className={cn("flex items-center gap-2 text-red-500", {
										"text-green-500": plot.synchronized,
									})}
								>
									<IoSyncOutline /> {plot.synchronized ? "Sincronizado" : "No sincronizado"}
								</p>

								<div className="flex gap-2">
									{/* <Button className="w-full bg-black/30 text-base hover:bg-black/50">
										<IoPencilOutline />
									</Button>
									<Button className="w-full bg-black/30 text-base hover:bg-black/50">
										<IoTrashOutline />
									</Button> */}
									<Link href={`/project/${projectId}/parcela/${plot.id}`}>
										<IoArrowForwardCircleOutline className="text-3xl text-neutral-500 transition-colors hover:text-white" />
									</Link>
								</div>
							</div>
						</div>
					</div>
				))}
			</Card>
		</main>
	)
}
