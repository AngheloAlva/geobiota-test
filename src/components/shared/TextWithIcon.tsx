interface TextWithIconProps {
	icon: React.ReactNode
	text: string | number
}

export default function TextWithIcon({ icon, text }: TextWithIconProps): React.ReactElement {
	return (
		<div className="flex items-center gap-2 text-neutral-400">
			{icon}
			<p>{text}</p>
		</div>
	)
}
