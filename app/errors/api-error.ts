export class APIError<B> extends Error {
  response: Response
  body: B | null

  constructor(response: Response, body: B | null) {
    super()

    this.response = response
    this.body = body
    this.message =
      body && typeof body === 'object' && 'error' in body
        ? String(body.error)
        : `${response.status} - ${response.statusText}`

    // Set the prototype explicitly to maintain the prototype chain
    Object.setPrototypeOf(this, APIError.prototype)
  }
}
