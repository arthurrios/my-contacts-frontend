import { Button } from '~/components/button';
import { Input } from '~/components/input';
import { PageHeader } from '~/components/page-header';
import { Select } from '~/components/select';

export default function NewContact() {
	return (
		<div>
			<PageHeader title="New contact" />
			<Input placeholder="Name" />
			<Select>
				<option value="instagram">Instagram</option>
			</Select>
			<Button title="Save contact" />
			<Button title="Save contact" disabled />
		</div>
	);
}
