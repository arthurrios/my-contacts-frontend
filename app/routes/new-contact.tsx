import { ContactForm, type ContactFormData } from 'app/components/contact-form'
import { PageHeader } from 'app/components/page-header'
import { APIError } from '~/errors/api-error'
import contactsService from '~/services/contacts-service'
import type { ContactCreateDTO } from '~/services/dtos/contacts'
import { toast } from '~/utils/toast'

export default function NewContact() {
  async function handleSubmit(formData: ContactFormData) {
    try {
      const newContact: ContactCreateDTO = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      }

      await contactsService.createContact(newContact)

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
      <ContactForm onSubmit={handleSubmit} buttonLabel="Save contact" />
    </div>
  )
}
