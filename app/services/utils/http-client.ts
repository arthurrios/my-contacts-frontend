import { APIError } from '~/errors/api-error'
import { delay } from '~/utils/delay'

class HttpClient {
  baseURL: string
  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  async get<T>(path: string) {
    await delay(1500)

    const response = await fetch(`${this.baseURL}${path}`)

    let body: T | null = null

    const contentType = response.headers.get('Content-Type')
    if (contentType?.includes('application/json')) {
      body = (await response.json()) as T
    }

    if (response.ok) {
      return body
    }

    throw new APIError(response, body)
  }
}

export default HttpClient
