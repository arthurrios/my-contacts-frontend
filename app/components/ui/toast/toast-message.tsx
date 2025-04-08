import { tv, type VariantProps } from 'tailwind-variants'
import xCircleIcon from '~/assets/images/x-circle.svg'
import checkCircle from '~/assets/images/check-circle.svg'
import { memo, useEffect } from 'react'
import clsx from 'clsx'

export const toast = tv({
  slots: {
    container:
      'rounded-sm shadow-md flex justify-center items-center gap-4 px-8 py-4 cursor-pointer animate-message-in',
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
  isLeaving: boolean
  animatedRef: React.RefObject<HTMLDivElement>
}

export const ToastMessage = memo(function ToastMessage({
  message,
  onRemoveMessage,
  isLeaving,
  animatedRef,
}: ToastMessageProps) {
  const { container, message: text } = toast({ variant: message.variant })

  console.log('toast renderizou', message.id)

  let icon: string | undefined

  if (message.variant === 'error') {
    icon = xCircleIcon
  } else if (message.variant === 'success') {
    icon = checkCircle
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
      ref={animatedRef}
      className={clsx(container(), isLeaving && 'animate-message-out')}
      onClick={handleRemoveToast}
      tabIndex={0}
      // biome-ignore lint/a11y/useSemanticElements: <explanation>
      role="button"
    >
      {icon && <img src={icon} alt="Toast icon" />}
      <strong className={text()}>{message.text}</strong>
    </div>
  )
})
