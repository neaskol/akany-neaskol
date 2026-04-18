import { getPayload } from 'payload'

const DEFAULT_TIMEOUT_MS = 5000

// Cached singleton — Payload initializes the DB pool once per process.
let payloadClient: Awaited<ReturnType<typeof getPayload>> | null = null
let payloadPromise: Promise<Awaited<ReturnType<typeof getPayload>>> | null = null

export function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error(`[${label}] timed out after ${ms}ms`))
    }, ms)

    promise
      .then((value) => {
        clearTimeout(timeoutId)
        resolve(value)
      })
      .catch((error) => {
        clearTimeout(timeoutId)
        reject(error)
      })
  })
}

export async function getPayloadClient(timeoutMs = DEFAULT_TIMEOUT_MS) {
  if (payloadClient) {
    return payloadClient
  }

  if (!payloadPromise) {
    // Dynamic import so evaluating this module at bundle time (e.g. during
    // next build pre-rendering) does NOT trigger a DB connection attempt.
    payloadPromise = import('@payload-config')
      .then((mod) => getPayload({ config: mod.default }))
      .then((client) => {
        payloadClient = client
        return client
      })
      .catch((error) => {
        payloadPromise = null
        throw error
      })
  }

  try {
    return await withTimeout(payloadPromise, timeoutMs, 'payload:init')
  } catch (error) {
    if (!payloadClient) {
      payloadPromise = null
    }
    throw error
  }
}
