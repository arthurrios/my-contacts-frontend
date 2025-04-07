import clsx from 'clsx'
import { Link } from 'react-router'

interface HeaderProps {
  hasError: boolean
  qtyOfContacts: number
  qtyOfFilteredContacts: number
}

export function Header({
  qtyOfContacts,
  qtyOfFilteredContacts,
  hasError,
}: HeaderProps) {
  return (
    <div
      className={clsx(
        'flex items-center',
        hasError
          ? 'justify-end'
          : qtyOfContacts > 0
            ? 'justify-between'
            : 'justify-center',
      )}
    >
      {!hasError && qtyOfContacts > 0 && (
        <strong className="text-gray-800 text-2xl">
          {qtyOfFilteredContacts}{' '}
          {qtyOfFilteredContacts === 1 ? 'contact' : 'contacts'}
        </strong>
      )}
      <Link
        to="/new-contact"
        className="text-base text-primary-main decoration-0 font-bold border-2 px-4 py-2 rounded-sm hover:bg-primary-main hover:text-white transition-all duration-200 ease-in-out"
      >
        New contact
      </Link>
    </div>
  )
}
