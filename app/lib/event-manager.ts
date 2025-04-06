type Listener<T = unknown> = (payload: T) => void
type EventMap = Map<string, Listener[]>

export class EventManager {
  private listeners: EventMap

  constructor() {
    this.listeners = new Map<string, Listener[]>()
  }

  on<T>(event: string, listener: Listener<T>): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event)?.push(listener as Listener)
  }

  emit<T>(event: string, payload: T): void {
    if (!this.listeners.has(event)) {
      return
    }
    // biome-ignore lint/complexity/noForEach: <explanation>
    this.listeners.get(event)?.forEach((listener) => {
      listener(payload)
    })
  }

  removeListener<T>(event: string, listenerToRemove: Listener<T>): void {
    const listeners = this.listeners.get(event)

    if (!listeners) {
      return
    }

    const filteredListeners = listeners.filter((l) => l !== listenerToRemove)

    this.listeners.set(event, filteredListeners)
  }
}
