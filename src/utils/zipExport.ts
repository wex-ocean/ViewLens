import JSZip from "jszip"
import { generateScreenshotFilename } from "./screenshot"

export interface ScreenshotExport {
  deviceLabel: string
  dataUrl: string
  timestamp: number
}

export const exportToZip = async (screenshots: ScreenshotExport[]) => {
  const zip = new JSZip()
  const timestamp = Date.now()
  const rootFolder = zip.folder("viewlens-export")

  if (!rootFolder) {
    throw new Error("Failed to create root folder")
  }

  for (const screenshot of screenshots) {
    const deviceFolder = rootFolder.folder(screenshot.deviceLabel.replace(/[^a-zA-Z0-9]/g, "-"))
    if (!deviceFolder) continue

    // Convert data URL to blob
    const base64Data = screenshot.dataUrl.split(",")[1]
    const binaryData = atob(base64Data)
    const bytes = new Uint8Array(binaryData.length)
    for (let i = 0; i < binaryData.length; i++) {
      bytes[i] = binaryData.charCodeAt(i)
    }

    const filename = generateScreenshotFilename(screenshot.deviceLabel, screenshot.timestamp)
    deviceFolder.file(filename, bytes)
  }

  // Generate ZIP file
  const blob = await zip.generateAsync({ type: "blob" })
  
  // Trigger download
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = generateZipFilename(timestamp)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export const generateZipFilename = (timestamp: number): string => {
  const date = new Date(timestamp)
  const dateStr = date.toISOString().replace(/[:.]/g, "-").slice(0, -5)
  return `viewlens-export-${dateStr}.zip`
}
