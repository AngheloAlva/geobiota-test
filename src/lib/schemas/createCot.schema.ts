import { z } from "zod"

export const createCotSchema = z.object({
	gpsAuto: z.boolean().optional(),
	group1: z.object({
		quadrille: z.string().min(1, { message: "Cuadrilla es requerida" }),
		date: z.date({ required_error: "Fecha es requerida" }),
		gps: z.object({
			latitude: z.string(),
			longitude: z.string(),
			altitude: z.string().optional(),
		}),
		hour: z.string().min(2, { message: "Hora es requerida" }),
	}),
	group2: z.object({
		cover: z.string().min(1, { message: "Cobertura es requerida" }),
		formation: z.string().min(1, { message: "Formación es requerida" }),
		spsTerrain: z.array(z.object({ sps: z.string() })),
	}),
	group3: z.object({
		slope: z.string().min(1, { message: "Inclinación es requerida" }),
		exposition: z.string().min(1, { message: "Exposición es requerida" }),
		drainage: z.string().min(1, { message: "Drenaje es requerido" }),
		topography: z.string().min(1, { message: "Topografía es requerida" }),
		susbtract: z.string().min(1, { message: "Subtracto es requerido" }),
		intervention: z.string().min(1, { message: "Intervención es requerida" }),
	}),
	group4: z.object({
		origin: z.string().optional(),
		development: z.string().optional(),
		sanitaryStatus: z.string().min(1, { message: "Estado sanitario es requerido" }),
	}),
})
