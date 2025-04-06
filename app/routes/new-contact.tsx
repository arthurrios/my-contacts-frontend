import { ContactForm, type ContactFormData } from 'app/components/contact-form'
import { PageHeader } from 'app/components/page-header'
import { APIError } from '~/errors/api-error'
import contactsService from '~/services/contacts-service'
import type { ContactCreateDTO } from '~/services/dtos/contacts'

export default function NewContact() {
  async function handleSubmit(formData: ContactFormData) {
    try {
      const newContact: ContactCreateDTO = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      }

      const response = await contactsService.createContact(newContact)

      console.log('response', response)
    } catch (error) {
      console.error('Error creating contact:', error)
      if (error instanceof APIError) {
        alert(error.message)
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
