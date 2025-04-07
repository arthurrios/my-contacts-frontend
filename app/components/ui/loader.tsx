import { useAnimatedUnmount } from '~/hooks/useAnimatedUnmount'
import { Spinner } from './spinner'
import clsx from 'clsx'

interface LoaderProps {
  isLoading: boolean
}

export function Loader({ isLoading }: LoaderProps) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount({
    visible: isLoading,
  })

  if (!shouldRender) {
    return null
  }

  return (
    <div
      ref={animatedElementRef}
      className={clsx(
        'bg-background/70 px-8 fixed flex items-center z-20 justify-center w-full h-full top-0 left-0 backdrop-blur-xs',
        isLoading ? 'animate-fade-in' : 'animate-fade-out',
      )}
    >
      <Spinner
        variant="loader"
        // className={isLoading ? 'animate-scale-in' : 'animate-scale-out'}
      />
    </div>
  )
}
