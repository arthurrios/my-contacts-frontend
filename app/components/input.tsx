import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ ...props }: InputProps) {
	return (
		<input
			className="bg-white w-full shadow-md border-none h-14 rounded-sm outline-0 px-4 text-base focus-within:ring-primary-main focus-within:ring-2 transition-all duration-200 ease-in-out placeholder:text-gray-200"
			{...props}
		/>
	);
}
