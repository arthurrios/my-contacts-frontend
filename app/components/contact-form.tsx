import { Button } from './button';
import { FormGroup } from './form-group';
import { Input } from './input';
import { Select } from './select';

interface ContactFormProps {
	buttonLabel: string;
}

export function ContactForm({ buttonLabel }: ContactFormProps) {
	return (
		<form className="flex flex-col gap-4">
			<FormGroup>
				<Input placeholder="Name" />
			</FormGroup>
			<FormGroup error="Email is invalid">
				<Input placeholder="Email" error />
			</FormGroup>
			<FormGroup>
				<Input placeholder="Phone" />
			</FormGroup>
			<FormGroup>
				<Select>
					<option value="instagram">Instagram</option>
					<option value="instagram">Instagram</option>
				</Select>
			</FormGroup>

			<Button title={buttonLabel} className="mt-6" />
		</form>
	);
}
