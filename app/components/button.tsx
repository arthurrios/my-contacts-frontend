import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	title: string;
	danger?: boolean;
}

export function Button({ title, danger, className, ...props }: ButtonProps) {
	return (
		<button
			className={clsx(
				'h-14 border-0 shadow-md px-4 text-base font-bold text-white rounded-sm  transition-colors duration-200 ease-in disabled:bg-gray-200 cursor-pointer disabled:cursor-not-allowed',
				danger
					? 'bg-danger-main hover:bg-danger-light active:bg-danger-dark'
					: 'bg-primary-main hover:bg-primary-light active:bg-primary-dark',
				className
			)}
			{...props}
		>
			{title}
		</button>
	);
}
