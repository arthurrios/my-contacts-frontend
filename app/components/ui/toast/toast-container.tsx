import { useEffect } from 'react'
import { ToastMessage, type ToastMessageProps } from './toast-message'
import { toastEventManager, type ToastEventProps } from '~/utils/toast'
import { useAnimatedList } from '~/hooks/useAnimatedList'

export function ToastContainer() {
  const {
    handleRemoveItem,
    setItems: setMessages,
    renderList,
  } = useAnimatedList<ToastMessageProps['message']>()

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
    }

    toastEventManager.on('addtoast', handleAddToast)

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast)
    }
  }, [setMessages])

  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col gap-4">
      {renderList(({ item: message, isLeaving, animatedRef }) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveItem}
          isLeaving={isLeaving}
          animatedRef={animatedRef}
        />
      ))}
    </div>
  )
}
