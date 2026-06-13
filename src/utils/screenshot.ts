import type { Screenshot } from "~types"

export const captureScreenshot = async (deviceLabel?: string): Promise<Screenshot> => {
  return new Promise((resolve, reject) => {
    chrome.tabs.captureVisibleTab({ format: "png" }, (dataUrl) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError)
        return
      }

      const timestamp = Date.now()
      const screenshot: Screenshot = {
        id: crypto.randomUUID(),
        url: window.location.href,
        timestamp,
        dataUrl,
        annotations: []
      }

      resolve(screenshot)
    })
  })
}

export const generateScreenshotFilename = (deviceLabel: string, timestamp: number): string => {
  const date = new Date(timestamp)
  const dateStr = date.toISOString().replace(/[:.]/g, "-").slice(0, -5)
  const label = deviceLabel.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase()
  return `viewlens-${label}-${dateStr}.png`
}

export const downloadScreenshot = (dataUrl: string, filename: string) => {
  const link = document.createElement("a")
  link.href = dataUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
