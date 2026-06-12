import { useEffect, useState } from "react"
import { db } from "~utils/indexedDB"

export function useIndexedDB<T>(key: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    db.get<T>(key).then((result) => {
      setData(result)
      setLoading(false)
    })
  }, [key])

  const saveData = async (newData: T) => {
    await db.save(key, newData)
    setData(newData)
  }

  const deleteData = async () => {
    await db.delete(key)
    setData(null)
  }

  return { data, saveData, deleteData, loading }
}
