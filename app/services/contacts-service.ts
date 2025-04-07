import type { ContactCreateDTO, ContactDTO } from './dtos/contacts'
import HttpClient from './utils/http-client'

class ContactsService {
  httpClient: HttpClient
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001')
  }

  loadContacts(orderBy = 'asc') {
    return this.httpClient.get<ContactDTO[]>(`/contacts?orderBy=${orderBy}`)
  }

  getContactById(id: string) {
    return this.httpClient.get<ContactDTO>(`/contacts/${id}`)
  }

  createContact(contact: ContactCreateDTO) {
    return this.httpClient.post<ContactCreateDTO>('/contacts', {
      body: contact,
    })
  }

  updateContact(id: string, contact: ContactCreateDTO) {
    return this.httpClient.put<ContactCreateDTO>(`/contacts/${id}`, {
      body: contact,
    })
  }

  deleteContact(id: string) {
    return this.httpClient.delete<ContactDTO>(`/contacts/${id}`)
  }
}

export default new ContactsService()
