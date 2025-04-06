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

  async post<T>(path: string, body: T) {
    await delay(1500)

    const headers = new Headers({
      'Content-Type': 'application/json',
    })

    const response = await fetch(`${this.baseURL}${path}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    })

    let responseBody: T | null = null

    const contentType = response.headers.get('Content-Type')
    if (contentType?.includes('application/json')) {
      responseBody = (await response.json()) as T
    }

    if (response.ok) {
      return responseBody
    }

    throw new APIError(response, responseBody)
  }
}

export default HttpClient
