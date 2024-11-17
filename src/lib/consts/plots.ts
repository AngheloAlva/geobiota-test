import type { Plot } from "@/db/types"

export const PLOTS: Plot[] = [
	{
		id: "1",
		name: "Parcela 1",
		status: "Pendiente",
		dimensions: {
			width: 100,
			length: 100,
		},
		gps: {
			latitude: 100,
			longitude: 100,
		},
		projectId: "1",
		synchronized: false,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "2",
		name: "Parcela 2",
		status: "Pendiente",
		projectId: "1",
		dimensions: {
			width: 100,
			length: 100,
		},
		gps: {
			latitude: 100,
			longitude: 100,
		},
		synchronized: false,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "3",
		name: "Parcela 3",
		status: "Pendiente",
		projectId: "2",
		dimensions: {
			width: 100,
			length: 100,
		},
		gps: {
			latitude: 100,
			longitude: 100,
		},
		synchronized: false,
		createdAt: new Date(),
		updatedAt: new Date(),
	},
]
