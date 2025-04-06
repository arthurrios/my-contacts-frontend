import type { ToastVariants } from '~/components/Toast/toast-message'
import { EventManager } from '~/lib/event-manager'

export const toastEventManager = new EventManager()

export interface ToastEventProps {
  variant: ToastVariants['variant']
  text: string
}

export function toast({ text, variant }: ToastEventProps) {
  toastEventManager.emit('addtoast', {
    variant,
    text,
  })
}
