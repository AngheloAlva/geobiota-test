"use client"

import { useEffect, useState } from "react"
import { PLOTS } from "@/lib/consts/plots"

import Card from "@/components/shared/Card"
import { IoSyncOutline, IoLocationOutline, IoPartlySunnyOutline } from "react-icons/io5"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { db } from "@/db"
import { COT, Plot } from "@/db/types"

export default function ParcelaPage({
	params,
}: {
	params: Promise<{ projectId: string; parcelaId: string }>
}): React.ReactElement {
	const [cot, setCot] = useState<COT[]>([])
	const [parcela, setParcela] = useState<Plot | null>(null)
	const [projectId, setProjectId] = useState<string>("")
	const [parcelaId, setParcelaId] = useState<string>("")

	useEffect(() => {
		const fetchData = async () => {
			if (typeof window !== "undefined") {
				const { projectId, parcelaId } = await params
				setProjectId(projectId)
				setParcelaId(parcelaId)

				const cotData = await db.cots.where("plotId").equals(parcelaId).toArray()
				setCot(cotData)
				const parcelaData = PLOTS.find((plot) => plot.id === parcelaId)
				setParcela(parcelaData ?? null)
			}
		}

		fetchData()
	}, [params])

	return (
		<main className="mx-auto grid w-full max-w-screen-lg grid-cols-1 items-center justify-center gap-x-4 gap-y-6 overflow-hidden px-4 py-24 md:grid-cols-2 md:px-6 xl:px-0">
			<Card title={parcela?.name}>
				<p className="flex items-center gap-2 text-sm text-neutral-400">
					<IoLocationOutline /> {parcela?.gps.latitude}, {parcela?.gps.longitude}
				</p>
				<p className="flex items-center gap-2 text-sm text-neutral-400">
					<IoPartlySunnyOutline /> {parcela?.dimensions.width}mts x {parcela?.dimensions.length}mts
				</p>
				<p className="flex items-center gap-2 text-sm text-neutral-400">
					<IoSyncOutline />
					{parcela?.synchronized ? "Sincronizado" : "No sincronizado"}
				</p>
			</Card>

			<Card title="COT">
				{cot.length > 0 ? (
					<>
						<p>COT agregado</p>
						<p>{cot[0].id}</p>

						<p>Grupo 1</p>
						<p>{new Date(cot[0].group1.date).toLocaleDateString()}</p>
						<p>{cot[0].group1.gps.latitude}</p>
						<p>{cot[0].group1.gps.longitude}</p>

						<Link href={`/project/${projectId}/parcela/${parcelaId}/cot`}>
							<Button className="w-full bg-black/30 text-base hover:bg-black/50" size={"lg"}>
								Editar COT
							</Button>
						</Link>
					</>
				) : (
					<Link href={`/project/${projectId}/parcela/${parcelaId}/cot`}>
						<Button className="w-full bg-black/30 text-base hover:bg-black/50" size={"lg"}>
							Agregar COT
						</Button>
					</Link>
				)}
			</Card>
		</main>
	)
}
