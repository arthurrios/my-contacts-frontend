import { useEffect, useRef, useState } from 'react'

interface UseAnimatedUnmountProps {
  visible: boolean
}

export function useAnimatedUnmount({ visible }: UseAnimatedUnmountProps) {
  const [shouldRender, setShouldRender] = useState(visible)

  const animatedElementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleAnimationEnd() {
      setShouldRender(false)
    }

    const elementRef = animatedElementRef.current

    if (visible) {
      setShouldRender(true)
    } else if (!visible && elementRef) {
      elementRef.addEventListener('animationend', handleAnimationEnd)
    }

    return () => {
      if (elementRef) {
        elementRef.removeEventListener('animationend', handleAnimationEnd)
      }
    }
  }, [visible])

  return { shouldRender, animatedElementRef }
}
