import { Link } from 'react-router'
import arrow from './../assets/images/arrow.svg'
import edit from './../assets/images/edit.svg'
import trash from './../assets/images/trash.svg'
import sad from './../assets/images/sad.svg'
import emptyBox from './../assets/images/empty-box.svg'
import magnifierQuestion from './../assets/images/magnifier-question.svg'
import clsx from 'clsx'

import { Loader } from '../components/loader'
import { Button } from '~/components/button'
import { Modal } from '~/components/modal'
import { useHome } from '~/hooks/controllers/use-home'

export default function Home() {
  const {
    isLoading,
    isDeleteModalVisible,
    contactBeingDeleted,
    isLoadingDelete,
    handleConfirmDeleteContact,
    handleCloseDeleteModal,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    filteredContacts,
    handleTryAgain,
    handleToggleOrderBy,
    orderBy,
    handleDeleteContact,
  } = useHome()

  return (
    <>
      <Loader isLoading={isLoading} />
      <Modal
        visible={isDeleteModalVisible}
        title={`Are you sure you want to remove "${contactBeingDeleted?.name}"?`}
        danger
        confirmLabel="Deletar"
        isLoading={isLoadingDelete}
        onConfirm={handleConfirmDeleteContact}
        onCancel={handleCloseDeleteModal}
      >
        <p>This action cannot be undone!</p>
      </Modal>
      {contacts.length > 0 && !hasError && (
        <div className="w-full">
          <input
            value={searchTerm}
            onChange={handleChangeSearchTerm}
            type="text"
            placeholder="Search contact..."
            className="w-full bg-white border-none rounded-3xl h-12.5 shadow-md outline-0 px-4 placeholder:text-gray-200"
          />
        </div>
      )}
      <div className="mt-8 flex flex-col gap-4">
        <div
          className={clsx(
            'flex items-center',
            hasError
              ? 'justify-end'
              : contacts.length > 0
                ? 'justify-between'
                : 'justify-center',
          )}
        >
          {!hasError && contacts.length > 0 && (
            <strong className="text-gray-800 text-2xl">
              {filteredContacts.length}{' '}
              {filteredContacts.length === 1 ? 'contact' : 'contacts'}
            </strong>
          )}
          <Link
            to="/new-contact"
            className="text-base text-primary-main decoration-0 font-bold border-2 px-4 py-2 rounded-sm hover:bg-primary-main hover:text-white transition-all duration-200 ease-in-out"
          >
            New contact
          </Link>
        </div>

        <div className="w-full h-0.5 bg-gray-100" />
        {hasError && (
          <div className="mt-4 flex items-center gap-6">
            <img src={sad} alt="Sad face" />

            <div className="flex flex-col gap-2">
              <strong className="text-danger-main text-2xl">
                There was an error loading your contacts!
              </strong>

              <Button
                title="Try again"
                className="w-fit"
                onClick={handleTryAgain}
              />
            </div>
          </div>
        )}

        {!hasError && (
          <>
            {contacts.length < 1 && !isLoading && (
              <div className="mt-4 flex flex-col items-center gap-2">
                <img src={emptyBox} alt="Empty box" />

                <p className="text-gray-200 text-center">
                  Você ainda não tem nenhum contato cadastrado! Clique no botão{' '}
                  <strong className="text-primary-main">”Novo contato”</strong>{' '}
                  à cima para cadastrar o seu primeiro!
                </p>
              </div>
            )}

            {contacts.length > 0 && filteredContacts.length < 1 && (
              <div className="flex items-start gap-6">
                <img src={magnifierQuestion} alt="Magnifier question" />

                <span className="text-gray-200 font-semibold break-all">
                  {`Nenhum resultado foi encontrado para ”${searchTerm}”.`}
                </span>
              </div>
            )}

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
                      onClick={() => handleDeleteContact(contact)}
                    >
                      <img src={trash} alt="Trash icon" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}
