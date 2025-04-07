import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { APIError } from '~/errors/api-error'
import contactsService from '~/services/contacts-service'
import type { ContactDomainDTO } from '~/services/mappers/contact-mapper'
import { toast } from '~/utils/toast'
import { useSafeAsyncAction } from '../useSafeAsyncAction'
import type { ContactFormRef } from './use-contact-form'

export function useEditContact() {
  const [isLoading, setIsLoading] = useState(true)
  const [contactName, setContactName] = useState('')
  const contactFormRef = useRef<ContactFormRef | null>(null)

  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const safeAsyncAction = useSafeAsyncAction()

  useEffect(() => {
    async function loadContact() {
      try {
        const contactData = await contactsService.getContactById(id as string)

        safeAsyncAction(() => {
          contactFormRef.current?.setFieldsValues(contactData)
          setIsLoading(false)
          setContactName(contactData.name)
        })
      } catch {
        safeAsyncAction(() => {
          navigate('/')
          toast({
            text: 'Contact not found',
            variant: 'error',
          })
        })
      }
    }
    loadContact()
  }, [id, navigate, safeAsyncAction])

  async function handleSubmit(formData: ContactDomainDTO) {
    try {
      if (!id) return

      const contactData = await contactsService.updateContact(id, formData)

      setContactName(contactData.name)

      toast({
        text: 'Contact updated successfully',
        variant: 'success',
        duration: 3000,
      })
    } catch (error) {
      if (error instanceof APIError) {
        toast({
          text: error.message,
          variant: 'error',
        })
      }
    }
  }
  return {
    isLoading,
    contactName,
    contactFormRef,
    handleSubmit,
  }
}
