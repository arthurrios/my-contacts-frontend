import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { Button } from './button'
import { FormGroup } from './form-group'
import { Input } from './input'
import { Select } from './select'
import { isEmailValid } from '~/utils/is-email-valid'
import { useErrors } from '~/hooks/useErrors'
import { formatPhone } from '~/utils/format-phone'
import categoriesService from '~/services/categories-service'
import type { CategoryDTO } from '~/services/dtos/categories'

interface ContactFormProps {
  buttonLabel: string
}

export function ContactForm({ buttonLabel }: ContactFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categories, setCategories] = useState<CategoryDTO[]>([])

  const [isLoadingCategories, setIsLoadingCategories] = useState(true)

  const { errors, setError, removeError, getErrorMessageByFieldName } =
    useErrors()

  const isFormValid = name && !errors.length

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesList = await categoriesService.listCategories()
        setCategories(categoriesList)
      } catch {
      } finally {
        setIsLoadingCategories(false)
      }
    }

    loadCategories()
  }, [])

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
      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          disabled={isLoadingCategories}
          isLoading={isLoadingCategories}
        >
          <option value="">No category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>

      <Button title={buttonLabel} className="mt-6" disabled={!isFormValid} />
    </form>
  )
}
