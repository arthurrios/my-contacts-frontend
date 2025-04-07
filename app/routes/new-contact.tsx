import {
  ContactForm,
  type ContactFormData,
  type ContactFormRef,
} from 'app/components/contact-form'
import { PageHeader } from 'app/components/page-header'
import { useRef } from 'react'
import { APIError } from '~/errors/api-error'
import contactsService from '~/services/contacts-service'
import type { ContactCreateDTO } from '~/services/dtos/contacts'
import { toast } from '~/utils/toast'

export default function NewContact() {
  const contactFormRef = useRef<ContactFormRef | null>(null)

  async function handleSubmit(formData: ContactFormData) {
    try {
      const newContact: ContactCreateDTO = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      }

      await contactsService.createContact(newContact)

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

  return (
    <div>
      <PageHeader title="New contact" />
      <ContactForm
        ref={contactFormRef}
        onSubmit={handleSubmit}
        buttonLabel="Save contact"
      />
    </div>
  )
}
