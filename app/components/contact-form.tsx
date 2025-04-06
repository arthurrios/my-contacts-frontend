import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Button } from './button'
import { FormGroup } from './form-group'
import { Input } from './input'
import { Select } from './select'
import { isEmailValid } from '~/utils/is-email-valid'
import { useErrors } from '~/hooks/useErrors'
import { formatPhone } from '~/utils/format-phone'

interface ContactFormProps {
  buttonLabel: string
}

export function ContactForm({ buttonLabel }: ContactFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [category, setCategory] = useState('')

  const { errors, setError, removeError, getErrorMessageByFieldName } =
    useErrors()

  const isFormValid = name && !errors.length

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)

    if (!event.target.value) {
      setError({ field: 'name', message: 'Name is required' })
    } else {
      removeError('name')
    }
  }

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({ field: 'email', message: 'Email is not valid' })
    } else {
      removeError('email')
    }
  }

  function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
    setPhone(formatPhone(event.target.value))
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          placeholder="Name *"
          value={name}
          onChange={handleNameChange}
          error={!!getErrorMessageByFieldName('name')}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          error={!!getErrorMessageByFieldName('email')}
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Phone"
          value={phone}
          onChange={handlePhoneChange}
          maxLength={15}
        />
      </FormGroup>
      <FormGroup>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="instagram">Instagram</option>
          <option value="instagram">Instagram</option>
        </Select>
      </FormGroup>

      <Button title={buttonLabel} className="mt-6" disabled={!isFormValid} />
    </form>
  )
}
