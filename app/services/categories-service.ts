import type { CategoryDTO } from './dtos/categories'
import HttpClient from './utils/http-client'

class CategoriesService {
  httpClient: HttpClient
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001')
  }

  async listCategories(): Promise<CategoryDTO[]> {
    const response = await this.httpClient.get<CategoryDTO[]>('/categories')
    return response || []
  }
}

export default new CategoriesService()
