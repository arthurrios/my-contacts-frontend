import { Loader } from '../../components/ui/loader'
import { useHome } from '~/hooks/controllers/use-home'
import { InputSearch } from '~/routes/home/components/input-search'
import { Header } from './components/header'
import { ErrorStatus } from './components/error-status'
import { EmptyList } from './components/empty-list'
import { SearchNotFound } from './components/search-not-found'
import { ContactsList } from './components/contacts-list'
import { Modal } from '~/components/ui/modal'

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

  const hasContacts = contacts.length > 0
  const isListEmpty = !hasError && !hasContacts && !isLoading
  const isSearchEmpty = !hasError && hasContacts && filteredContacts.length < 1

  return (
    <>
      <Loader isLoading={isLoading} />

      {hasContacts && (
        <InputSearch
          placeholder="Search contact..."
          onChange={handleChangeSearchTerm}
          value={searchTerm}
        />
      )}
      <div className="mt-8 flex flex-col gap-4">
        <Header
          qtyOfContacts={contacts.length}
          qtyOfFilteredContacts={filteredContacts.length}
          hasError={hasError}
        />

        <div className="w-full h-0.5 bg-gray-100" />

        {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
        {isListEmpty && <EmptyList />}
        {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}

        {hasContacts && (
          <>
            <ContactsList
              filteredContacts={filteredContacts}
              onDeleteContact={handleDeleteContact}
              onToggleOrderBy={handleToggleOrderBy}
              orderBy={orderBy}
            />

            <Modal
              visible={isDeleteModalVisible}
              title={`Are you sure you want to remove "${contactBeingDeleted?.name}"?`}
              danger
              confirmLabel="Delete"
              isLoading={isLoadingDelete}
              onConfirm={handleConfirmDeleteContact}
              onCancel={handleCloseDeleteModal}
            >
              <p>This action cannot be undone!</p>
            </Modal>
          </>
        )}
      </div>
    </>
  )
}
