import { ContactForm, type ContactFormRef } from 'app/components/contact-form'
import { PageHeader } from 'app/components/page-header'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Loader } from '~/components/loader'
import { APIError } from '~/errors/api-error'
import { useSafeAsyncAction } from '~/hooks/useSafeAsyncAction'
import contactsService from '~/services/contacts-service'
import type { ContactDomainDTO } from '~/services/mappers/contact-mapper'
import { toast } from '~/utils/toast'

export default function EditContact() {
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
