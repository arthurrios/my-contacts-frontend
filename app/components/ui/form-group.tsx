import type { HTMLAttributes } from 'react'
import { Spinner } from './spinner'

interface FormGroupProps extends HTMLAttributes<HTMLDivElement> {
  error?: string | null
  isLoading?: boolean
}

export function FormGroup({
  children,
  isLoading = false,
  error = null,
  ...props
}: FormGroupProps) {
  return (
    <div {...props}>
      <div className="relative">
        {children}

        {isLoading && <Spinner />}
      </div>
      {error && (
        <small className="text-danger-main mt-2 block text-xs">{error}</small>
      )}
    </div>
  )
}
