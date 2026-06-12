import { useEffect, useState } from "react"
import { storage } from "~utils/storage"
import type { StorageKey } from "~types"

export function useChromeStorage<T>(key: StorageKey, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    storage.get<T>(key).then((result) => {
      if (result !== null) setValue(result)
      setLoading(false)
    })
  }, [key])

  const updateValue = async (newValue: T) => {
    await storage.set(key, newValue)
    setValue(newValue)
  }

  return { value, setValue: updateValue, loading }
}
