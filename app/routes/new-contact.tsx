import { ContactForm } from 'app/components/contact-form'
import { PageHeader } from 'app/components/page-header'
import { useNewContact } from '~/hooks/controllers/use-new-contact'

export default function NewContact() {
  const { handleSubmit, contactFormRef } = useNewContact()

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
