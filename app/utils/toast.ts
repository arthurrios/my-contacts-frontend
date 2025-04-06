import type { ToastVariants } from '~/components/Toast/toast-message'
import { EventManager } from '~/lib/event-manager'

export const toastEventManager = new EventManager()

export interface ToastEventProps {
  variant: ToastVariants['variant']
  text: string
  duration?: number
}

export function toast({ text, variant, duration = 7000 }: ToastEventProps) {
  console.log('Emitting toast event:', { text, variant, duration })
  toastEventManager.emit('addtoast', {
    variant,
    text,
    duration,
  })
}
