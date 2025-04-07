import {
  contactMapper,
  type ContactDomainDTO,
  type ContactPersistanceDTO,
} from './mappers/contact-mapper'
import HttpClient from './utils/http-client'

class ContactsService {
  httpClient: HttpClient
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001')
  }

  async loadContacts(orderBy = 'asc') {
    const contacts = await this.httpClient.get<ContactDomainDTO[]>(
      `/contacts?orderBy=${orderBy}`,
    )
    return contacts.map(contactMapper.toDomain)
  }

  async getContactById(id: string) {
    const contact = await this.httpClient.get<ContactDomainDTO>(
      `/contacts/${id}`,
    )

    return contactMapper.toDomain(contact)
  }

  createContact(contact: ContactDomainDTO) {
    const body = contactMapper.toPersistance(contact)
    return this.httpClient.post<ContactPersistanceDTO>('/contacts', {
      body,
    })
  }

  updateContact(id: string, contact: ContactDomainDTO) {
    const body = contactMapper.toPersistance(contact)

    return this.httpClient.put<ContactPersistanceDTO>(`/contacts/${id}`, {
      body,
    })
  }

  deleteContact(id: string) {
    return this.httpClient.delete<ContactDomainDTO>(`/contacts/${id}`)
  }
}

export default new ContactsService()
