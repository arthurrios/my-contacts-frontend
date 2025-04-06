import clsx from 'clsx'
import { Button } from './button'

interface ModalProps {
  buttonLabel: string
  danger?: boolean
}

export function Modal({ buttonLabel, danger = false }: ModalProps) {
  return (
    <div className="bg-black/60 px-8 absolute flex items-center justify-center w-full h-full top-0 left-0 backdrop-blur-xs">
      <div className="bg-white rounded-md p-6 shadow-md max-w-112.5 w-full">
        <h1
          className={clsx(
            'text-2xl font-bold',
            danger ? 'text-danger-main' : 'text-gray-900',
          )}
        >
          Modal title
        </h1>
        <p className="mt-2">Modal body</p>

        <footer className="mt-8 flex items-center justify-end gap-2">
          <button type="button" className="bg-transparent text-gray-200">
            Cancel
          </button>
          <Button title={buttonLabel} danger={danger} />
        </footer>
      </div>
    </div>
  )
}
