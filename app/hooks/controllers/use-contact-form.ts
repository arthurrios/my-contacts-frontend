import {
  useState,
  useImperativeHandle,
  useEffect,
  type ChangeEvent,
  type FormEvent,
  type RefObject,
} from 'react'
import categoriesService from '~/services/categories-service'
import type { CategoryDomainDTO } from '~/services/mappers/category-mapper'
import type { ContactDomainDTO } from '~/services/mappers/contact-mapper'
import { formatPhone } from '~/utils/format-phone'
import { isEmailValid } from '~/utils/is-email-valid'
import { useErrors } from '../useErrors'

export interface ContactFormData {
  name: string
  email?: string
  phone: string
  categoryId?: string
}

export interface ContactFormRef {
  setFieldsValues: (contact: ContactDomainDTO) => void
  resetFields: () => void
}

interface ContactFormProps {
  buttonLabel?: string
  onSubmit: (formData: ContactDomainDTO) => Promise<void>
  ref?: RefObject<ContactFormRef | null>
}

export function useContactForm({
  buttonLabel,
  onSubmit,
  ref,
}: ContactFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categories, setCategories] = useState<CategoryDomainDTO[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [isLoadingCategories, setIsLoadingCategories] = useState(false)

  const { errors, setError, removeError, getErrorMessageByFieldName } =
    useErrors()

  const isFormValid = name && !errors.length

  useImperativeHandle(
    ref,
    () => ({
      setFieldsValues: (contact: ContactDomainDTO) => {
        setName(contact.name ?? '')
        setEmail(contact.email ?? '')
        setPhone(contact.phone ?? '')
        setCategoryId(contact.category.id ?? '')
      },
      resetFields: () => {
        setName('')
        setEmail('')
        setPhone('')
        setCategoryId('')
      },
    }),
    [],
  )

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

    await onSubmit({ name, email, phone, category: { id: categoryId } })

    setIsSubmitting(false)
  }
  return {
    handleSubmit,
    getErrorMessageByFieldName,
    name,
    handleNameChange,
    isSubmitting,
    email,
    handleEmailChange,
    phone,
    handlePhoneChange,
    isLoadingCategories,
    categoryId,
    setCategoryId,
    categories,
    isFormValid,
    buttonLabel,
  }
}
