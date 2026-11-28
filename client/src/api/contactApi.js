import { request } from './client'

export function sendContact(message) {
    return request(() => ({ ok: true, receivedAt: new Date().toISOString(), message }))
}