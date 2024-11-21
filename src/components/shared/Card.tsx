import { cn } from "@/lib/utils"

export default function Card({
	title,
	children,
	className,
	description,
}: {
	title?: string
	className?: string
	description?: string
	children: React.ReactNode
}): React.ReactElement {
	return (
		<section className={cn("flex h-fit w-full flex-col text-white", className)}>
			<h2 className="text-2xl font-bold">{title}</h2>
			{description && <p className="text-sm font-medium text-text-dark">{description}</p>}

			<div className="mt-4 flex w-full flex-col gap-2">{children}</div>
		</section>
	)
}
