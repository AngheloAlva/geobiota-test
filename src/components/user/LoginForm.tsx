"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { login } from "@/lib/auth"

export default function LoginForm() {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const router = useRouter()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			await login(username, password)
			router.push("/home")
		} catch (error) {
			console.error("Error durante el inicio de sesión:", error)
			// Aquí podrías mostrar un mensaje de error al usuario
		}
	}

	return (
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle>Iniciar sesión</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<label htmlFor="username">Usuario</label>
						<Input
							id="username"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</div>
					<div className="space-y-2">
						<label htmlFor="password">Contraseña</label>
						<Input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<Button type="submit" className="w-full">
						Ingresar
					</Button>
				</form>
			</CardContent>
		</Card>
	)
}
