import { Link } from 'react-router'
import arrow from '../../../assets/images/arrow.svg'
import edit from '../../../assets/images/edit.svg'
import trash from '../../../assets/images/trash.svg'
import clsx from 'clsx'
import type { ContactDomainDTO } from '~/services/mappers/contact-mapper'

interface ContactListProps {
  filteredContacts: ContactDomainDTO[]
  orderBy: string
  onToggleOrderBy: () => void
  onDeleteContact: (contact: ContactDomainDTO) => void
}

export function ContactsList({
  filteredContacts,
  onDeleteContact,
  onToggleOrderBy,

  orderBy,
}: ContactListProps) {
  return (
    <>
      {filteredContacts.length > 0 && (
        <header className="mb-2">
          <button
            type="button"
            className="flex gap-2 items-center cursor-pointer"
            onClick={onToggleOrderBy}
          >
            <span className="font-bold text-primary-main">Name</span>
            <img
              src={arrow}
              alt="Arrow icon"
              className={clsx(
                orderBy === 'desc'
                  ? 'transform rotate-180 transition-all duration-200 ease-in'
                  : 'transform rotate-0 transition-all duration-200 ease-in',
              )}
            />
          </button>
        </header>
      )}

      <div className="flex flex-col gap-4">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-white flex items-center justify-between shadow-md p-4 rounded-sm"
          >
            <div>
              <div className="flex items-center gap-2">
                <strong>{contact.name}</strong>
                {contact.category.name && (
                  <small className="bg-primary-lighter text-primary-main font-bold uppercase p-1 rounded-sm">
                    {contact.category.name}
                  </small>
                )}
              </div>
              <span className="block text-sm text-gray-200">
                {contact.email}
              </span>
              <span className="block text-sm text-gray-200">
                {contact.phone}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Link to={`/edit-contact/${contact.id}`}>
                <img src={edit} alt="Edit icon" />
              </Link>
              <button
                type="button"
                className="bg-transparent border-none cursor-pointer"
                onClick={() => onDeleteContact(contact)}
              >
                <img src={trash} alt="Trash icon" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
