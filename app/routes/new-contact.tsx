import { ContactForm } from 'app/components/contact-form'
import { PageHeader } from 'app/components/page-header'

export default function NewContact() {
  return (
    <div>
      <PageHeader title="New contact" />
      <ContactForm buttonLabel="Save contact" />
    </div>
  )
}
