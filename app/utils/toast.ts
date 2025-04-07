import type { ToastVariants } from '~/components/Toast/toast-message'
import { EventManager } from '~/lib/event-manager'

export const toastEventManager = new EventManager()

export interface ToastEventProps {
  variant: ToastVariants['variant']
  text: string
  duration?: number
}

export function toast({ text, variant, duration = 7000 }: ToastEventProps) {
  toastEventManager.emit('addtoast', {
    variant,
    text,
    duration,
  })
}
