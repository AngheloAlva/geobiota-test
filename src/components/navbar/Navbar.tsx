import Link from "next/link"

import Logo from "../icons/Logo"

export default function Navbar(): React.ReactElement {
	return (
		<nav className="fixed left-4 right-4 top-4 z-10 mx-auto flex items-center justify-between rounded-full bg-black/30 px-6 py-4 shadow backdrop-blur-md md:left-6 md:right-6 md:top-6 lg:max-w-screen-lg">
			<Link href="/">
				<Logo className="h-6 w-auto text-white" />
			</Link>
		</nav>
	)
}
