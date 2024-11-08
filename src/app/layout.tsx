import "@fontsource-variable/roboto-mono"
import Link from "next/link"

import { Toaster } from "@/components/ui/toaster"
import Logo from "@/components/icons/Logo"

import type { Metadata, Viewport } from "next"

import "./globals.css"

const APP_NAME = "PWA App"
const APP_DEFAULT_TITLE = "My Awesome PWA App"
const APP_TITLE_TEMPLATE = "%s - PWA App"
const APP_DESCRIPTION = "Best PWA app in the world!"

export const metadata: Metadata = {
	applicationName: APP_NAME,
	title: {
		default: APP_DEFAULT_TITLE,
		template: APP_TITLE_TEMPLATE,
	},
	description: APP_DESCRIPTION,
	manifest: "/manifest.json",
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: APP_DEFAULT_TITLE,
		// startUpImage: [],
	},
	formatDetection: {
		telephone: false,
	},
	openGraph: {
		type: "website",
		siteName: APP_NAME,
		title: {
			default: APP_DEFAULT_TITLE,
			template: APP_TITLE_TEMPLATE,
		},
		description: APP_DESCRIPTION,
	},
	twitter: {
		card: "summary",
		title: {
			default: APP_DEFAULT_TITLE,
			template: APP_TITLE_TEMPLATE,
		},
		description: APP_DESCRIPTION,
	},
}

export const viewport: Viewport = {
	themeColor: "#FFFFFF",
}
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="es">
			<body className={`h-screen min-h-screen bg-primary-g antialiased`}>
				<nav className="fixed left-0 right-0 top-0 z-10 bg-primary-g px-4 py-4 shadow">
					<Link href="/">
						<Logo className="text-secondary-g" />
					</Link>
				</nav>
				{children}
				<Toaster />
			</body>
		</html>
	)
}
