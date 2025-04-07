import { useState, useMemo, useCallback, useEffect } from 'react'
import contactsService from '~/services/contacts-service'
import type { ContactDomainDTO } from '~/services/mappers/contact-mapper'
import { toast } from '~/utils/toast'

export function useHome() {
  const [contacts, setContacts] = useState<ContactDomainDTO[]>([])
  const [orderBy, setOrderBy] = useState<'asc' | 'desc'>('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [contactBeingDeleted, setContactBeingDeleted] =
    useState<ContactDomainDTO | null>(null)
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [contacts, searchTerm])

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true)

      const contactsList = await contactsService.loadContacts(orderBy)

      setHasError(false)
      setContacts(contactsList)
    } catch (error) {
      setHasError(true)
      setContacts([])
    } finally {
      setIsLoading(false)
    }
  }, [orderBy])

  useEffect(() => {
    loadContacts()
  }, [loadContacts])

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'))
  }

  function handleChangeSearchTerm(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value)
  }

  function handleTryAgain() {
    loadContacts()
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false)
  }

  function handleDeleteContact(contact: ContactDomainDTO) {
    setContactBeingDeleted(contact)
    setIsDeleteModalVisible(true)
  }

  async function handleConfirmDeleteContact() {
    try {
      if (!contactBeingDeleted?.id) return
      setIsLoadingDelete(true)
      await contactsService.deleteContact(contactBeingDeleted.id)

      setContacts((prevState) =>
        prevState.filter((contact) => contact.id !== contactBeingDeleted.id),
      )

      handleCloseDeleteModal()
      toast({
        text: 'Contact deleted successfully',
        variant: 'success',
      })
    } catch {
      toast({
        text: 'Error deleting contact',
        variant: 'error',
      })
    } finally {
      setIsLoadingDelete(false)
    }
  }

  return {
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
  }
}
