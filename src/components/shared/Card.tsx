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
		<section
			className={cn(
				"flex h-full w-full flex-col rounded-2xl bg-black/30 p-4 text-white",
				className
			)}
		>
			<h2 className="text-2xl font-bold">{title}</h2>
			{description && <p className="text-sm text-neutral-400">{description}</p>}

			<div className="mt-4 flex w-full flex-col gap-4">{children}</div>
		</section>
	)
}
