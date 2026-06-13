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
  },

  async saveCustomPreset(preset: any): Promise<void> {
    const presets = await this.getCustomPresets()
    await this.set("customPresets", [...presets, preset])
  },

  async getCustomPresets(): Promise<any[]> {
    const result = await this.get<any[]>("customPresets")
    return result || []
  },

  async deleteCustomPreset(id: string): Promise<void> {
    const presets = await this.getCustomPresets()
    await this.set(
      "customPresets",
      presets.filter((p) => p.id !== id)
    )
  },

  async saveUrlToHistory(url: string): Promise<void> {
    const history = await this.getUrlHistory()
    const newItem = {
      id: crypto.randomUUID(),
      url,
      timestamp: Date.now()
    }
    const updated = [newItem, ...history.filter((h) => h.url !== url)].slice(0, 20)
    await this.set("urlHistory", updated)
  },

  async getUrlHistory(): Promise<any[]> {
    const result = await this.get<any[]>("urlHistory")
    return result || []
  },

  async clearUrlHistory(): Promise<void> {
    await this.set("urlHistory", [])
  }
}
