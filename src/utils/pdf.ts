import { jsPDF } from "jspdf"
import type { Screenshot } from "~types"

export const exportToPDF = async (screenshots: Screenshot[], filename = "viewlens-export.pdf") => {
  const doc = new jsPDF()
  
  screenshots.forEach((screenshot, index) => {
    if (index > 0) {
      doc.addPage()
    }
    
    const imgData = screenshot.dataUrl
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    
    doc.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight)
    
    doc.setFontSize(10)
    doc.text(`Captured: ${new Date(screenshot.timestamp).toLocaleString()}`, 10, pageHeight - 10)
  })
  
  doc.save(filename)
}
