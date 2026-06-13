import { useState } from "react"

interface ExportToolbarProps {
  isMultiScreen: boolean
  onScreenshotCurrent: () => Promise<void>
  onScreenshotAll: () => Promise<void>
  onExportPDF: () => Promise<void>
  onExportZIP: () => Promise<void>
}

export const ExportToolbar = ({
  isMultiScreen,
  onScreenshotCurrent,
  onScreenshotAll,
  onExportPDF,
  onExportZIP
}: ExportToolbarProps) => {
  const [isExporting, setIsExporting] = useState(false)
  const [exportStatus, setExportStatus] = useState("")

  const handleAction = async (action: () => Promise<void>, statusMsg: string) => {
    setIsExporting(true)
    setExportStatus(statusMsg)
    try {
      await action()
      setExportStatus("Complete!")
      setTimeout(() => setExportStatus(""), 2000)
    } catch (error) {
      setExportStatus("Failed")
      console.error(error)
      setTimeout(() => setExportStatus(""), 2000)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-background border-b border-border">
      <span className="text-sm font-medium text-muted-foreground">Export:</span>
      
      <button
        onClick={() => handleAction(onScreenshotCurrent, "Capturing...")}
        disabled={isExporting}
        className="flex items-center gap-2 px-3 py-1.5 text-xs bg-background border border-border rounded-md hover:bg-accent transition-colors disabled:opacity-50"
        title="Screenshot current device">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
        Screenshot
      </button>

      {isMultiScreen && (
        <button
          onClick={() => handleAction(onScreenshotAll, "Capturing all...")}
          disabled={isExporting}
          className="flex items-center gap-2 px-3 py-1.5 text-xs bg-background border border-border rounded-md hover:bg-accent transition-colors disabled:opacity-50"
          title="Screenshot all devices">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
          All Devices
        </button>
      )}

      <div className="w-px h-6 bg-border" />

      <button
        onClick={() => handleAction(onExportPDF, "Exporting PDF...")}
        disabled={isExporting}
        className="flex items-center gap-2 px-3 py-1.5 text-xs bg-background border border-border rounded-md hover:bg-accent transition-colors disabled:opacity-50"
        title="Export as PDF">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
        PDF
      </button>

      <button
        onClick={() => handleAction(onExportZIP, "Exporting ZIP...")}
        disabled={isExporting}
        className="flex items-center gap-2 px-3 py-1.5 text-xs bg-background border border-border rounded-md hover:bg-accent transition-colors disabled:opacity-50"
        title="Export as ZIP">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <polyline points="21 8 21 21 3 21 3 8" />
          <rect x="1" y="3" width="22" height="5" />
          <line x1="10" y1="12" x2="14" y2="12" />
        </svg>
        ZIP
      </button>

      {exportStatus && (
        <span className="text-xs text-muted-foreground animate-pulse">{exportStatus}</span>
      )}
    </div>
  )
}
