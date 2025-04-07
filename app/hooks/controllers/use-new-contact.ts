import { useRef } from 'react'
import { APIError } from '~/errors/api-error'
import contactsService from '~/services/contacts-service'
import type { ContactDomainDTO } from '~/services/mappers/contact-mapper'
import { toast } from '~/utils/toast'
import type { ContactFormRef } from './use-contact-form'

export function useNewContact() {
  const contactFormRef = useRef<ContactFormRef | null>(null)

  async function handleSubmit(formData: ContactDomainDTO) {
    try {
      await contactsService.createContact(formData)

      contactFormRef.current?.resetFields()

      toast({
        text: 'Contact created successfully',
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
  return { handleSubmit, contactFormRef }
}
