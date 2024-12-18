import { Project } from "@/db/types"

export const PROJECTS: Project[] = [
	{
		id: "1",
		name: "Proyecto 1",
		client: "Cliente 1",
		year: 2024,
		seasonality: "Invierno",
		status: "Pendiente",
		synchronized: true,
		createdAt: new Date(),
	},
	{
		id: "2",
		name: "Proyecto 2",
		client: "Cliente 2",
		year: 2024,
		seasonality: "Primavera",
		status: "Pendiente",
		synchronized: true,
		createdAt: new Date(),
	},
	{
		id: "3",
		name: "Proyecto 3",
		client: "Cliente 3",
		year: 2024,
		seasonality: "Verano",
		status: "Pendiente",
		synchronized: true,
		createdAt: new Date(),
	},
	{
		id: "4",
		name: "Proyecto 4",
		client: "Cliente 4",
		year: 2024,
		seasonality: "Otoño",
		status: "Pendiente",
		synchronized: true,
		createdAt: new Date(),
	},
]
