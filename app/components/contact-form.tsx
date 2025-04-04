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
			<FormGroup>
				<Input placeholder="Email" />
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

			<div className="mt-6">
				<Button title={buttonLabel} />
			</div>
		</form>
	);
}
