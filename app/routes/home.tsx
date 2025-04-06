import { Link } from 'react-router'
import arrow from './../assets/images/arrow.svg'
import edit from './../assets/images/edit.svg'
import trash from './../assets/images/trash.svg'
import { useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'

import { Loader } from '../components/loader'
import { delay } from '~/utils/delay'

export interface ContactDTO {
  id: string
  name: string
  email: string
  phone: string
  category_id: string
  category_name: string
}

export default function Home() {
  const [contacts, setContacts] = useState<ContactDTO[]>([])
  const [orderBy, setOrderBy] = useState<'asc' | 'desc'>('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [contacts, searchTerm])

  useEffect(() => {
    async function loadContacts() {
      try {
        setIsLoading(true)

        const response = await fetch(
          `http://localhost:3001/contacts?orderBy=${orderBy}`,
        )

        await delay(500)

        const json = await response.json()
        setContacts(json)
      } catch (error) {
        console.log('error', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadContacts()
  }, [orderBy])

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'))
  }

  function handleChangeSearchTerm(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value)
  }

  return (
    <>
      <Loader isLoading={isLoading} />
      <div className="w-full">
        <input
          value={searchTerm}
          onChange={handleChangeSearchTerm}
          type="text"
          placeholder="Search contact..."
          className="w-full bg-white border-none rounded-3xl h-12.5 shadow-md outline-0 px-4 placeholder:text-gray-200"
        />
      </div>
      <div className="mt-8 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <strong className="text-gray-800 text-2xl">
            {filteredContacts.length}{' '}
            {filteredContacts.length === 1 ? 'contact' : 'contacts'}
          </strong>
          <Link
            to="/new-contact"
            className="text-base text-primary-main decoration-0 font-bold border-2 px-4 py-2 rounded-sm hover:bg-primary-main hover:text-white transition-all duration-200 ease-in-out"
          >
            New contact
          </Link>
        </div>

        <div className="w-full h-0.5 bg-gray-200" />

        <div>
          {filteredContacts.length > 0 && (
            <header className="mb-2">
              <button
                type="button"
                className="flex gap-2 items-center cursor-pointer"
                onClick={handleToggleOrderBy}
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
                    {contact.category_name && (
                      <small className="bg-primary-lighter text-primary-main font-bold uppercase p-1 rounded-sm">
                        {contact.category_name}
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
                  <button type="button" className="bg-transparent border-none">
                    <img src={trash} alt="Trash icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
