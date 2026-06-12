import type { Screenshot } from "~types"

export const captureScreenshot = async (): Promise<Screenshot> => {
  return new Promise((resolve, reject) => {
    chrome.tabs.captureVisibleTab({ format: "png" }, (dataUrl) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError)
        return
      }

      const screenshot: Screenshot = {
        id: crypto.randomUUID(),
        url: window.location.href,
        timestamp: Date.now(),
        dataUrl,
        annotations: []
      }

      resolve(screenshot)
    })
  })
}
