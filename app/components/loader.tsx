import { Spinner } from './spinner'

interface LoaderProps {
  isLoading: boolean
}

export function Loader({ isLoading }: LoaderProps) {
  if (!isLoading) {
    return null
  }

  return (
    <div className="bg-background/70 px-8 absolute flex items-center justify-center w-full h-full top-0 left-0 backdrop-blur-xs">
      <Spinner variant="loader" />
    </div>
  )
}
