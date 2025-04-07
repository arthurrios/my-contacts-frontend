import { ContactForm } from '~/components/app/contact-form'
import { PageHeader } from '~/components/app/page-header'
import { Loader } from '~/components/ui/loader'
import { useEditContact } from '~/hooks/controllers/use-edit-contact'

export default function EditContact() {
  const { isLoading, contactFormRef, contactName, handleSubmit } =
    useEditContact()

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
