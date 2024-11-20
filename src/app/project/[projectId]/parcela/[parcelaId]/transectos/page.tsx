"use client"

import { useToast } from "@/hooks/use-toast"
import { useEffect, useState } from "react"

import { IoTrashBinOutline } from "react-icons/io5"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Card from "@/components/shared/Card"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

export default function TransectosPage({
	params,
}: {
	params: Promise<{ projectId: string; parcelaId: string }>
}): React.ReactElement {
	const [longitude, setLongitude] = useState(0)
	const [transects, setTransects] = useState<string[]>([])
	const [selectedRange, setSelectedRange] = useState<{ start: number; end: number }[]>([])
	const [species, setSpecies] = useState<string[]>([])
	const [occupiedPercentage, setOccupiedPercentage] = useState<number[]>([])

	const { toast } = useToast()

	const generateTransects = () => {
		const parts = Math.floor(longitude / 0.1)
		const newTransects = Array.from({ length: parts }, (_, i) => (i * 0.1).toFixed(1))
		setTransects(newTransects)
	}

	const handleRangeChange = (index: number, start: number, end: number) => {
		const newRanges = [...selectedRange]
		newRanges[index] = { start, end }
		setSelectedRange(newRanges)

		// Calculate occupied percentage
		const percentage = ((end - start) / longitude) * 100
		const newPercentages = [...occupiedPercentage]
		newPercentages[index] = percentage
		setOccupiedPercentage(newPercentages)
	}

	return (
		<main className="mx-auto grid w-full max-w-screen-lg grid-cols-1 items-center justify-center gap-x-4 gap-y-6 overflow-hidden px-4 py-24 md:px-6 xl:px-0">
			<Card title="Transectos">
				<p className="text-sm text-neutral-400">Longitud total</p>
				<Input
					value={longitude}
					type="number"
					className="border-black/50 bg-black/30"
					onChange={(e) => setLongitude(Number(e.target.value))}
				/>

				<Button
					className="w-full bg-black/30 text-base hover:bg-black/50"
					onClick={generateTransects}
				>
					Generar transectos
				</Button>

				{transects.map((transect, index) => (
					<div key={index} className="flex items-center space-x-2">
						<Select
							onValueChange={(value) =>
								handleRangeChange(index, Number(value), selectedRange[index]?.end || 0)
							}
						>
							<SelectTrigger>
								<SelectValue placeholder="Inicio" />
							</SelectTrigger>
							<SelectContent>
								{transects.map((option) => (
									<SelectItem key={option} value={option}>
										{option}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						<Select
							onValueChange={(value) =>
								handleRangeChange(index, selectedRange[index]?.start || 0, Number(value))
							}
						>
							<SelectTrigger>
								<SelectValue placeholder="Fin" />
							</SelectTrigger>
							<SelectContent>
								{transects.map((option) => (
									<SelectItem key={option} value={option}>
										{option}
									</SelectItem>
								))}
							</SelectContent>
						</Select>

						<Input
							placeholder="Especie"
							value={species[index] || ""}
							onChange={(e) => {
								const newSpecies = [...species]
								newSpecies[index] = e.target.value
								setSpecies(newSpecies)
							}}
						/>

						<Input readOnly value={`${occupiedPercentage[index] || 0}%`} className="" />
					</div>
				))}
			</Card>
		</main>
	)
}
