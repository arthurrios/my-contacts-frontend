import {
  useContactForm,
  type ContactFormRef,
} from '~/hooks/controllers/use-contact-form'
import { Button } from '../ui/button'
import { FormGroup } from '../ui/form-group'
import { Input } from '../ui/input'
import { Select } from '../ui/select'
import { Spinner } from '../ui/spinner'
import type { ContactDomainDTO } from '~/services/mappers/contact-mapper'
import type { RefObject } from 'react'

interface ContactFormProps {
  onSubmit: (formData: ContactDomainDTO) => Promise<void>
  buttonLabel?: string
  ref?: RefObject<ContactFormRef | null>
}

export function ContactForm({ onSubmit, buttonLabel, ref }: ContactFormProps) {
  const {
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
  } = useContactForm({ onSubmit, ref })

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
