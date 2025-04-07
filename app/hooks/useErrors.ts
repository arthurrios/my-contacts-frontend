import { useCallback, useState } from 'react'

interface ErrorProps {
  field: string
  message: string
}

export function useErrors() {
  const [errors, setErrors] = useState<ErrorProps[]>([])

  const setError = useCallback(
    ({ field, message }: ErrorProps) => {
      const errorAlreadyExists = errors.find((error) => error.field === field)
      if (errorAlreadyExists) {
        return
      }

      setErrors((prevState) => [...prevState, { field, message }])
    },
    [errors],
  )

  const removeError = useCallback(
    (field: string) =>
      setErrors((prevState) =>
        prevState.filter((error) => error.field !== field),
      ),
    [],
  )

  const getErrorMessageByFieldName = useCallback(
    (field: string) => errors.find((error) => error.field === field)?.message,
    [errors],
  )

  return { errors, setError, getErrorMessageByFieldName, removeError }
}
