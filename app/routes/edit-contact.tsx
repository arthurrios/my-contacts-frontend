import { ContactForm } from '~/components/contact-form';
import { PageHeader } from '~/components/page-header';

export default function EditContact() {
	return (
		<div>
			<PageHeader title="Arthur Rios" />
			<ContactForm buttonLabel="Update contact" />
		</div>
	);
}
