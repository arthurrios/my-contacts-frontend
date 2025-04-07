import type { CategoryDomainDTO } from './category-mapper'

export interface ContactDTO {
  id: string
  name: string
  email: string
  phone: string
  categoryId: string
  categoryNname: string
}
export interface ContactPersistanceDTO {
  id?: string
  name: string
  email?: string
  phone: string
  category_id?: string
  category_name?: string
}

export interface ContactDomainDTO {
  id?: string
  name: string
  email?: string
  phone: string
  category: CategoryDomainDTO
}

class ContactMapper {
  toPersistance(domainContact: ContactDomainDTO): ContactPersistanceDTO {
    return {
      name: domainContact.name,
      email: domainContact.email,
      phone: domainContact.phone,
      category_id: domainContact.category.id,
    }
  }

  toDomain(persistanceContact: ContactPersistanceDTO): ContactDomainDTO {
    return {
      id: persistanceContact.id,
      name: persistanceContact.name,
      email: persistanceContact.email,
      phone: persistanceContact.phone,
      category: {
        id: persistanceContact.category_id ?? '',
        name: persistanceContact.category_name ?? '',
      },
    }
  }
}

export const contactMapper = new ContactMapper()
