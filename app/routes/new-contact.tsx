import { ContactForm } from '~/components/contact-form';
import { PageHeader } from '~/components/page-header';

export default function NewContact() {
	return (
		<div>
			<PageHeader title="New contact" />
			<ContactForm buttonLabel="Save contact" />
		</div>
	);
}
