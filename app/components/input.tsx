import clsx from 'clsx';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	error?: boolean;
}

export function Input({ error = false, ...props }: InputProps) {
	return (
		<input
			className={clsx(
				'bg-white w-full shadow-md border-none h-14 rounded-sm outline-0 px-4 text-base focus-within:ring-2 transition-all duration-200 ease-in-out',
				error
					? 'text-danger-main ring-danger ring-2 focus-within:ring-danger-main placeholder:text-danger-main'
					: 'text-gray-800 ring-gray-200 focus-within:ring-primary-main placeholder:text-gray-200'
			)}
			{...props}
		/>
	);
}
