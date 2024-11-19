import "@fontsource-variable/roboto-mono"

import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/navbar/Navbar"

import type { Metadata, Viewport } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/shared/Provider"

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
	themeColor: "#171717",
}
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="es">
			<body className={`min-h-screeno relative overflow-x-hidden antialiased`}>
				{/* <ThemeProvider
					enableSystem
					attribute="class"
					defaultTheme="system"
					disableTransitionOnChange
				> */}
				<Navbar />
				<div className="absolute bottom-0 top-0 z-[-2] min-h-screen w-screen bg-neutral-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,#278e6c80,rgba(255,255,255,0))]"></div>

				{children}
				<Toaster />
				{/* </ThemeProvider> */}
			</body>
		</html>
	)
}
