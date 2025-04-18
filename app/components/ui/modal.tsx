import clsx from 'clsx'
import { Button } from './button'
import type { ReactNode } from 'react'
import { useAnimatedUnmount } from '~/hooks/useAnimatedUnmount'

interface ModalProps {
  title: string
  children: ReactNode
  cancelLabel?: string
  confirmLabel?: string
  danger?: boolean
  isLoading?: boolean
  onCancel?: () => void
  onConfirm?: () => void
  visible: boolean
}

export function Modal({
  children,
  title,
  isLoading = false,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  onCancel,
  onConfirm,
  visible,
  danger = false,
}: ModalProps) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount({ visible })

  if (!shouldRender) {
    return null
  }

  return (
    <div
      ref={animatedElementRef}
      className={clsx(
        'bg-black/60 px-8 fixed flex items-center justify-center w-full h-full top-0 left-0 backdrop-blur-xs',
        visible ? 'animate-fade-in' : 'animate-fade-out',
      )}
    >
      <div
        className={clsx(
          'bg-white rounded-md p-6 shadow-md max-w-112.5 w-full',
          visible ? 'animate-scale-in' : 'animate-scale-out',
        )}
      >
        <h1
          className={clsx(
            'text-2xl font-bold',
            danger ? 'text-danger-main' : 'text-gray-900',
          )}
        >
          {title}
        </h1>
        <div className="mt-8">{children}</div>
        <footer className="mt-8 flex items-center justify-end gap-2">
          <button
            type="button"
            className="bg-transparent text-gray-200 cursor-pointer disabled:cursor-not-allowed"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelLabel}
          </button>
          <Button isLoading={isLoading} danger={danger} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </footer>
      </div>
    </div>
  )
}
