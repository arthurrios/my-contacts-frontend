import { APIError } from '~/errors/api-error'
import { delay } from '~/utils/delay'

class HttpClient {
  baseURL: string
  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  get<T>(path: string, options?: { body?: T; headers?: HeadersInit }) {
    return this.makeRequest<T>(path, {
      method: 'GET',
      headers: options?.headers,
    })
  }

  post<T>(path: string, options?: { body?: T; headers?: HeadersInit }) {
    return this.makeRequest<T>(path, {
      method: 'POST',
      body: options?.body as T,
      headers: options?.headers,
    })
  }

  put<T>(path: string, options?: { body?: T; headers?: HeadersInit }) {
    return this.makeRequest<T>(path, {
      method: 'PUT',
      body: options?.body as T,
      headers: options?.headers,
    })
  }

  delete<T>(path: string, options?: { headers?: HeadersInit }) {
    return this.makeRequest<T>(path, {
      method: 'DELETE',
      headers: options?.headers,
    })
  }

  async makeRequest<T>(
    path: string,
    options: { method: string; body?: T; headers?: HeadersInit },
  ) {
    await delay(500)

    const headers = new Headers()

    if (options.body) {
      headers.append('Content-Type', 'application/json')
    }

    if (options.headers) {
      // biome-ignore lint/complexity/noForEach: <explanation>
      Object.entries(options.headers).forEach(([key, value]) => {
        headers.append(key, value as string)
      })
    }

    const response = await fetch(`${this.baseURL}${path}`, {
      method: options.method,
      body: JSON.stringify(options.body),
      headers,
    })

    let responseBody = null

    const contentType = response.headers.get('Content-Type')
    if (contentType?.includes('application/json')) {
      responseBody = await response.json()
    }

    if (response.ok) {
      return responseBody as T
    }

    throw new APIError(response, responseBody)
  }
}

export default HttpClient
