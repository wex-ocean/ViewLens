import type { StorageKey } from "~types"

export const storage = {
  async get<T>(key: StorageKey): Promise<T | null> {
    const result = await chrome.storage.local.get(key)
    return result[key] ?? null
  },

  async set<T>(key: StorageKey, value: T): Promise<void> {
    await chrome.storage.local.set({ [key]: value })
  },

  async remove(key: StorageKey): Promise<void> {
    await chrome.storage.local.remove(key)
  },

  async clear(): Promise<void> {
    await chrome.storage.local.clear()
  }
}
