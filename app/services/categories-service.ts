import type { CategoryDTO } from './dtos/categories'
import HttpClient from './utils/http-client'

class CategoriesService {
  httpClient: HttpClient
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001')
  }

  listCategories() {
    return this.httpClient.get<CategoryDTO[]>('/categories')
  }
}

export default new CategoriesService()
