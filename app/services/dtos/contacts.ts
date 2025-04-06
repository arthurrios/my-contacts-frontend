export interface ContactDTO {
  id: string
  name: string
  email: string
  phone: string
  category_id: string
  category_name: string
}

export interface ContactCreateDTO {
  name: string
  email?: string
  phone: string
  category_id?: string
}
