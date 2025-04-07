import { ContactForm, type ContactFormRef } from 'app/components/contact-form'
import { PageHeader } from 'app/components/page-header'
import { useRef } from 'react'
import { APIError } from '~/errors/api-error'
import contactsService from '~/services/contacts-service'
import type { ContactDomainDTO } from '~/services/mappers/contact-mapper'
import { toast } from '~/utils/toast'

export default function NewContact() {
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
