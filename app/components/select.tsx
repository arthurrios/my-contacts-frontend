import type { SelectHTMLAttributes } from 'react';
import dropdownArrow from '../assets/images/dropdown-arrow.svg';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

export function Select({ ...props }: SelectProps) {
	return (
		<div className="relative">
			<img
				src={dropdownArrow}
				alt="Select arrow"
				className="absolute w-3 z-10 top-6 right-4"
			/>
			<select
				className="bg-white w-full shadow-md border-none relative h-14 appearance-none rounded-sm outline-0 px-4 text-base focus-within:ring-primary-main focus-within:ring-2 transition-all duration-200 ease-in-out placeholder:text-gray-200"
				{...props}
			/>
		</div>
	);
}
