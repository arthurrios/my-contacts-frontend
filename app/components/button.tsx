import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	title: string;
}

export function Button({ title, ...props }: ButtonProps) {
	return (
		<button
			className="w-full h-14 border-0 shadow-md bg-primary-main text-base font-bold text-white rounded-sm hover:bg-primary-light active:bg-primary-dark transition-colors duration-200 ease-in disabled:bg-gray-200 cursor-pointer disabled:cursor-not-allowed"
			{...props}
		>
			{title}
		</button>
	);
}
