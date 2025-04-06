import type { ContactDTO } from './dtos/contacts'
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
}

export default new ContactsService()
