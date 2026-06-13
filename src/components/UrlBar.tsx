import { useState, KeyboardEvent } from "react"

interface UrlBarProps {
  currentUrl: string
  onUrlChange: (url: string) => void
}

export const UrlBar = ({ currentUrl, onUrlChange }: UrlBarProps) => {
  const [inputValue, setInputValue] = useState(currentUrl)
  const [error, setError] = useState("")

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        try {
          new URL(`https://${url}`)
          return true
        } catch {
          return false
        }
      }
      return false
    }
  }

  const handleLoad = () => {
    let finalUrl = inputValue.trim()

    if (!finalUrl) {
      setError("Please enter a URL")
      return
    }

    if (!finalUrl.startsWith("http://") && !finalUrl.startsWith("https://")) {
      finalUrl = `https://${finalUrl}`
    }

    if (!validateUrl(finalUrl)) {
      setError("Invalid URL format")
      return
    }

    setError("")
    onUrlChange(finalUrl)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLoad()
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value)
            setError("")
          }}
          onKeyDown={handleKeyDown}
          placeholder="Enter URL (e.g., example.com)"
          className="flex-1 px-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          onClick={handleLoad}
          className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
          Load
        </button>
      </div>
      {error && (
        <span className="text-xs text-destructive px-1">{error}</span>
      )}
    </div>
  )
}
