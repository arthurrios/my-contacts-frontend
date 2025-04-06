interface LoaderProps {
	isLoading: boolean;
}

export function Loader({ isLoading }: LoaderProps) {
	if (!isLoading) {
		return null;
	}

	return (
		<div className="bg-background/70 px-8 absolute flex items-center justify-center w-full h-full top-0 left-0 backdrop-blur-xs">
			<div className="text-primary-main text-[90px] -indent-[9999rem] overflow-hidden w-[1em] h-[1em] rounded-full my-20 mx-auto relative transform translate-0 animate-[var(--animate-load-round)]" />
		</div>
	);
}
