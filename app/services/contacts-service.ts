import type { ContactCreateDTO, ContactDTO } from './dtos/contacts'
import HttpClient from './utils/http-client'

class ContactsService {
  httpClient: HttpClient
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001')
  }

  async loadContacts(orderBy = 'asc'): Promise<ContactDTO[]> {
    const response = await this.httpClient.get<ContactDTO[]>(
      `/contacts?orderBy=${orderBy}`,
    )
    return response || []
  }

  async createContact(contact: ContactCreateDTO) {
    return this.httpClient.post<ContactCreateDTO>('/contacts', {
      body: JSON.stringify(contact),
    })
  }
}

export default new ContactsService()
