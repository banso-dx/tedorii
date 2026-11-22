const RAILS_API_URL = process.env.RAILS_API_URL ?? "http://localhost:4000"

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${RAILS_API_URL}${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...(init?.headers ?? {}) },
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error(`Rails API error ${res.status} on ${path}`)
  }

  if (res.status === 204) return undefined as T

  const text = await res.text()
  return (text ? JSON.parse(text) : undefined) as T
}

export function apiGet<T>(path: string): Promise<T> {
  return request<T>(path)
}

export function apiPost<T>(path: string, body: unknown): Promise<T> {
  return request<T>(path, { method: "POST", body: JSON.stringify(body) })
}
