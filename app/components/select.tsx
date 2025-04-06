import type { SelectHTMLAttributes } from 'react'
import dropdownArrow from '../assets/images/dropdown-arrow.svg'
import clsx from 'clsx'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  isLoading?: boolean
}

export function Select({ isLoading = false, ...props }: SelectProps) {
  return (
    <div className="relative">
      {!isLoading && (
        <img
          src={dropdownArrow}
          alt="Select arrow"
          className="absolute w-3 z-10 top-6 right-4"
        />
      )}
      <select
        className={clsx(
          'bg-white w-full shadow-md border-none relative h-14 appearance-none rounded-sm outline-0 px-4 text-base focus-within:ring-primary-main focus-within:ring-2 transition-all duration-200 ease-in-out placeholder:text-gray-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed',
        )}
        {...props}
      />
    </div>
  )
}
