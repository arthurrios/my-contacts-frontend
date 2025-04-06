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
import { Spinner } from './spinner'

export interface ContactFormData {
  name: string
  email?: string
  phone: string
  categoryId?: string
}

interface ContactFormProps {
  buttonLabel: string
  onSubmit: (formData: ContactFormData) => Promise<void>
}

export function ContactForm({ buttonLabel, onSubmit }: ContactFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categories, setCategories] = useState<CategoryDTO[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [isLoadingCategories, setIsLoadingCategories] = useState(false)

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

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    setIsSubmitting(true)

    await onSubmit({ name, email, phone, categoryId })

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          placeholder="Name *"
          value={name}
          onChange={handleNameChange}
          error={!!getErrorMessageByFieldName('name')}
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={handleEmailChange}
          disabled={isSubmitting}
          error={!!getErrorMessageByFieldName('email')}
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Phone"
          value={phone}
          onChange={handlePhoneChange}
          maxLength={15}
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          disabled={isLoadingCategories || isSubmitting}
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

      <Button
        type="submit"
        className="mt-6 relative"
        disabled={!isFormValid || isSubmitting}
        isLoading={isSubmitting}
      >
        {!isSubmitting ? buttonLabel : <Spinner variant="button" />}
      </Button>
    </form>
  )
}
