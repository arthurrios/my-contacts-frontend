import { useCallback, useEffect, useState } from 'react'
import { ToastMessage, type ToastMessageProps } from './toast-message'
import { toastEventManager, type ToastEventProps } from '~/utils/toast'

export function ToastContainer() {
  const [messages, setMessages] = useState<ToastMessageProps['message'][]>([])

  useEffect(() => {
    function handleAddToast({ text, variant, duration }: ToastEventProps) {
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random(),
          text,
          variant,
          duration,
        },
      ])

      // setTimeout(() => {
      //   setMessages((prev) => prev.filter((message) => message.text !== text))
      // }, 3000)
    }

    toastEventManager.on('addtoast', handleAddToast)

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast)
    }
  }, [])

  const handleRemoveMessage = useCallback((id: number) => {
    setMessages((prev) => prev.filter((message) => message.id !== id))
  }, [])

  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col gap-4">
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </div>
  )
}
