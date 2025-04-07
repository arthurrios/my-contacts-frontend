import { tv, type VariantProps } from 'tailwind-variants'
import xCircleIcon from '~/assets/images/x-circle.svg'
import checkCircle from '~/assets/images/check-circle.svg'
import { useEffect } from 'react'

export const toast = tv({
  slots: {
    container:
      'rounded-sm shadow-md flex justify-center items-center gap-4 px-8 py-4 cursor-pointer',
    message: 'text-white font-bold',
    icon: '',
  },
  variants: {
    variant: {
      default: {
        container: 'bg-primary-main',
      },
      error: {
        container: 'bg-danger-main',
        icon: 'xCircleIcon',
      },
      success: {
        container: 'bg-green-500',
        icon: 'checkCircle',
      },
    },
  },

  defaultVariants: {
    variant: 'default',
  },
})

export type ToastVariants = VariantProps<typeof toast>

export interface ToastMessageProps {
  message: {
    id: number
    text: string
    variant: ToastVariants['variant']
    duration?: number
  }
  onRemoveMessage: (id: number) => void
}

export function ToastMessage({ message, onRemoveMessage }: ToastMessageProps) {
  const { container, message: text } = toast({ variant: message.variant })

  let icon: string | undefined

  switch (message.variant) {
    case 'error':
      icon = xCircleIcon
      break

    case 'success':
      icon = checkCircle
      break
    default:
      icon = undefined
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id)
    }, message.duration || 7000)

    return () => clearTimeout(timeoutId)
  }, [message, onRemoveMessage])

  function handleRemoveToast() {
    onRemoveMessage(message.id)
  }

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      className={container()}
      onClick={handleRemoveToast}
      tabIndex={0}
      // biome-ignore lint/a11y/useSemanticElements: <explanation>
      role="button"
    >
      {icon && <img src={icon} alt="Toast icon" />}
      <strong className={text()}>{message.text}</strong>
    </div>
  )
}
