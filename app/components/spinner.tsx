import { tv, type VariantProps } from 'tailwind-variants'

const spinner = tv({
  base: 'text-primary-main w-[1em] h-[1em] rounded-full transform translate-0 animate-[var(--animate-load-round)]',
  variants: {
    variant: {
      loader: 'text-[90px] -indent-[9999px] mx-auto my-20 relative',
      input: 'text-[16px] right-4 top-6 absolute',
    },
  },

  defaultVariants: {
    variant: 'input',
  },
})

type SpinnerVariants = VariantProps<typeof spinner>

interface SpinnerProps extends SpinnerVariants {
  className?: string
}

export function Spinner({ className, variant }: SpinnerProps) {
  const clsx = spinner({ variant, className })
  return <div className={clsx} />
}
