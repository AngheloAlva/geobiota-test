"use client"

import { getGeolocation } from "@/lib/geolocation"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { db } from "@/db"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Card from "@/components/shared/Card"

import type { COT } from "@/db/types"

export default function CotPage(): React.ReactElement {
	const [quadrille, setQuadrille] = useState<string>("")
	const [plotId, setPlotId] = useState<string>("")

	const { toast } = useToast()
	const router = useRouter()

	const [cot, setCot] = useState<COT["group1"]>({
		quadrille: "",
		date: new Date(),
		gps: {
			latitude: 0,
			longitude: 0,
		},
		hour: 0,
	})

	useEffect(() => {
		getGeolocation()
			.then((position) =>
				setCot({
					...cot,
					gps: {
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					},
				})
			)
			.catch((error) => console.log(error))
	}, [])

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target
		setCot({ ...cot, [id]: value })
	}

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			const id = await db.cots.add({
				plotId,
				group1: {
					...cot,
				},
				group2: {
					cover: "",
					formation: "",
					spsTerrain: [],
				},
				group3: {
					exposition: "",
					drainage: "",
					topography: "",
					susbtract: "",
					slope: 0,
					intervention: "",
				},
			})

			toast({
				title: "COT agregada",
				description: `COT con ID ${id} agregado correctamente`,
			})

			router.push(`/cot/vegetacion/${id}`)
		} catch (error) {
			toast({
				title: "Error al agregar COT",
				description: "Hubo un error al agregar el COT",
				variant: "destructive",
			})
		}
	}

	return (
		<main className="mx-auto grid w-full max-w-screen-lg grid-cols-1 items-center justify-center gap-x-4 gap-y-6 overflow-hidden px-4 py-24 md:grid-cols-2 md:px-6 xl:px-0">
			<Card title="Agregar COT" className="md:col-span-2">
				<form onSubmit={onSubmit}>
					<div className="grid grid-cols-1 gap-x-4 gap-y-4 text-white sm:grid-cols-2">
						<div className="grid gap-y-2">
							<Label htmlFor="cuadrilla">Cuadrilla</Label>
							<Input
								required
								id="cuadrilla"
								value={quadrille}
								className="border-black/30 bg-black/30"
								onChange={(e) => setQuadrille(e.target.value)}
							/>
						</div>

						<div className="grid gap-y-2">
							<Label htmlFor="fecha">Fecha</Label>
							<Input
								required
								id="fecha"
								type="date"
								onChange={handleChange}
								className="border-black/30 bg-black/30"
								value={cot.date.toISOString().split("T")[0]}
							/>
						</div>

						<div className="grid gap-y-2">
							<Label htmlFor="hora">Hora</Label>
							<Input
								required
								id="hora"
								type="time"
								value={cot.hour}
								onChange={handleChange}
								className="border-black/30 bg-black/30"
							/>
						</div>

						<div className="grid gap-y-2">
							<Label htmlFor="imagen">Imagen</Label>
							<Input
								id="imagen"
								type="file"
								accept="image/*"
								className="border-black/30 bg-black/30"
							/>
						</div>

						<div className="grid gap-y-2">
							<Label htmlFor="altitud">Altitud</Label>
							<Input
								id="altitud"
								onChange={handleChange}
								value={cot.gps.altitude}
								className="border-black/30 bg-black/30"
							/>
						</div>

						<div className="md:col-span-2">
							<p className="text-sm text-white/50">
								lat: {cot.gps.latitude} - long: {cot.gps.longitude}
							</p>
						</div>
					</div>

					<Button
						size="lg"
						type="submit"
						className="mt-6 w-full bg-black/30 text-base hover:bg-black/50 md:col-span-2"
					>
						Continuar
					</Button>
				</form>
			</Card>
		</main>
	)
}
