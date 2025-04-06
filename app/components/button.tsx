import clsx from 'clsx'
import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  danger?: boolean
  isLoading?: boolean
}

export function Button({
  children,
  isLoading,
  danger,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'h-14 border-0 shadow-md px-4 text-base font-bold text-white rounded-sm flex items-center justify-center transition-colors duration-200 ease-in disabled:bg-gray-200 cursor-pointer disabled:cursor-not-allowed',
        isLoading
          ? 'bg-gray-200'
          : danger
            ? 'bg-danger-main hover:bg-danger-light active:bg-danger-dark'
            : 'bg-primary-main hover:bg-primary-light active:bg-primary-dark',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
