import { jsPDF } from "jspdf"
import type { Screenshot } from "~types"

export const exportToPDF = async (screenshots: Screenshot[], url?: string) => {
  const doc = new jsPDF()
  const timestamp = Date.now()
  
  screenshots.forEach((screenshot, index) => {
    if (index > 0) {
      doc.addPage()
    }
    
    const imgData = screenshot.dataUrl
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    
    // Add device label header
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.text(`Device: ${screenshot.url || `Device ${index + 1}`}`, 10, 10)
    
    // Add screenshot image
    const imgHeight = pageHeight - 30
    doc.addImage(imgData, "PNG", 10, 15, pageWidth - 20, imgHeight)
    
    // Add footer with timestamp and URL
    doc.setFontSize(8)
    doc.setFont("helvetica", "normal")
    const dateStr = new Date(screenshot.timestamp).toLocaleString()
    doc.text(`Captured: ${dateStr}`, 10, pageHeight - 5)
    if (url) {
      doc.text(`URL: ${url}`, 10, pageHeight - 10)
    }
  })
  
  const filename = generatePDFFilename(timestamp)
  doc.save(filename)
}

export const generatePDFFilename = (timestamp: number): string => {
  const date = new Date(timestamp)
  const dateStr = date.toISOString().replace(/[:.]/g, "-").slice(0, -5)
  return `viewlens-export-${dateStr}.pdf`
}
