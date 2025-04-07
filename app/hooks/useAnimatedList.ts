import {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type JSX,
  type RefObject,
} from 'react'

interface RenderItemProps<T> {
  item: T
  isLeaving: boolean
  animatedRef: RefObject<HTMLDivElement>
}

export function useAnimatedList<I extends { id: number }>(
  initialValue: I[] = [],
) {
  const [items, setItems] = useState<I[]>(initialValue)
  const [pendingRemovalItemIds, setPendingRemovalItemIds] = useState<number[]>(
    [],
  )

  const animatedRefs = useRef(new Map())
  const animationEndListeners = useRef(new Map())

  const handleAnimationEnd = useCallback((itemId: number) => {
    const removeListener = animationEndListeners.current.get(itemId)
    removeListener()

    animationEndListeners.current.delete(itemId)
    animatedRefs.current.delete(itemId)

    setItems((prevState) => prevState.filter((item) => item.id !== itemId))
    setPendingRemovalItemIds((prevState) =>
      prevState.filter((id) => itemId !== id),
    )
  }, [])

  useEffect(() => {
    // biome-ignore lint/complexity/noForEach: <explanation>
    pendingRemovalItemIds.forEach((itemId: number) => {
      const animatedRef: RefObject<HTMLDivElement> =
        animatedRefs.current.get(itemId)
      const animatedElement = animatedRef?.current
      const alreadyHasListener = animationEndListeners.current.has(itemId)

      if (animatedElement && !alreadyHasListener) {
        const onAnimationEnd = () => {
          handleAnimationEnd(itemId)
        }
        const removeListener = () => {
          animatedElement.removeEventListener('animationend', onAnimationEnd)
        }

        animatedElement.addEventListener('animationend', onAnimationEnd)
        animationEndListeners.current.set(itemId, removeListener)
      }
    })
  }, [pendingRemovalItemIds, handleAnimationEnd])

  useEffect(() => {
    const removeListeners = animationEndListeners.current
    return () => {
      // biome-ignore lint/complexity/noForEach: <explanation>
      removeListeners.forEach((removeListener) => removeListener())
    }
  }, [])

  const handleRemoveItem = useCallback((id: number) => {
    setPendingRemovalItemIds((prevState) => [...prevState, id])
  }, [])

  const getAnimatedRef = useCallback((id: number) => {
    let animatedRef = animatedRefs.current.get(id)
    if (!animatedRef) {
      animatedRef = createRef<HTMLDivElement>()
      animatedRefs.current.set(id, animatedRef)
    }
    return animatedRef
  }, [])

  const renderList = useCallback(
    (renderItem: ({ item, isLeaving }: RenderItemProps<I>) => JSX.Element) =>
      items.map((item) => {
        const isLeaving = pendingRemovalItemIds.includes(item.id)

        const animatedRef = getAnimatedRef(item.id)

        return renderItem({
          item,
          isLeaving,
          animatedRef,
        })
      }),
    [items, pendingRemovalItemIds, getAnimatedRef],
  )

  return {
    handleRemoveItem,
    items,
    setItems,
    renderList,
  }
}
