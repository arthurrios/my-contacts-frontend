import type { HTMLAttributes } from 'react'

interface FormGroupProps extends HTMLAttributes<HTMLDivElement> {
  error?: string | null
}

export function FormGroup({
  children,
  error = null,
  ...props
}: FormGroupProps) {
  return (
    <div {...props}>
      {children}
      {error && (
        <small className="text-danger-main mt-2 block text-xs">{error}</small>
      )}
    </div>
  )
}
