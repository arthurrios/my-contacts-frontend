import type { HTMLAttributes } from 'react';
import { Input } from './input';

interface FormGroupProps extends HTMLAttributes<HTMLDivElement> {}

export function FormGroup({ children, ...props }: FormGroupProps) {
	return <div {...props}>{children}</div>;
}
