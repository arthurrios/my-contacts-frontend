import {
  ContactForm,
  type ContactFormData,
  type ContactFormRef,
} from 'app/components/contact-form'
import { PageHeader } from 'app/components/page-header'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Loader } from '~/components/loader'
import { APIError } from '~/errors/api-error'
import contactsService from '~/services/contacts-service'
import type { ContactCreateDTO } from '~/services/dtos/contacts'
import { toast } from '~/utils/toast'

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true)
  const [contactName, setContactName] = useState('')
  const contactFormRef = useRef<ContactFormRef | null>(null)

  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  useEffect(() => {
    async function loadContact() {
      try {
        const contactData = await contactsService.getContactById(id as string)

        contactFormRef.current?.setFieldsValues(contactData)
        setIsLoading(false)
        setContactName(contactData.name)
      } catch {
        navigate('/')
        toast({
          text: 'Contact not found',
          variant: 'error',
        })
      }
    }
    loadContact()
  }, [id, navigate])

  async function handleSubmit(formData: ContactFormData) {
    try {
      if (!id) return
      const newContact: ContactCreateDTO = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      }

      const contactData = await contactsService.updateContact(id, newContact)

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
  return (
    <div>
      <Loader isLoading={isLoading} />
      <PageHeader title={isLoading ? 'Loading...' : `Editar ${contactName}`} />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Update contact"
        onSubmit={handleSubmit}
      />
    </div>
  )
}
