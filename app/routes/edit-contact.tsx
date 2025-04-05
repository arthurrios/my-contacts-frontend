import { ContactForm } from 'app/components/contact-form';
import { PageHeader } from 'app/components/page-header';

export default function EditContact() {
	return (
		<div>
			<PageHeader title="Arthur Rios" />
			<ContactForm buttonLabel="Update contact" />
		</div>
	);
}
