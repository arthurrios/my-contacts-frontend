import { Button } from '~/components/ui/button'
import sad from '../../../assets/images/sad.svg'

interface ErrorStatusProps {
  onTryAgain: () => void
}

export function ErrorStatus({ onTryAgain }: ErrorStatusProps) {
  return (
    <div className="mt-4 flex items-center gap-6">
      <img src={sad} alt="Sad face" />

      <div className="flex flex-col gap-2">
        <strong className="text-danger-main text-2xl">
          There was an error loading your contacts!
        </strong>

        <Button className="w-fit" onClick={onTryAgain}>
          Try again
        </Button>
      </div>
    </div>
  )
}
