import { ContactForm } from '~/components/app/contact-form'
import { PageHeader } from '~/components/app/page-header'
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
