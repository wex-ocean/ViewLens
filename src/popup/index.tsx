import "~style.css"
import { useViewLensStore } from "~store"

function IndexPopup() {
  const { annotationMode, toggleAnnotationMode } = useViewLensStore()

  const handleCapture = async () => {
    const response = await chrome.runtime.sendMessage({ type: "CAPTURE_SCREENSHOT" })
    console.log("Screenshot captured:", response)
  }

  const openPanel = () => {
    chrome.runtime.sendMessage({ type: "OPEN_SIDE_PANEL" })
  }

  return (
    <div className="w-80 p-4">
      <h1 className="text-xl font-bold mb-4">ViewLens</h1>
      <div className="space-y-2">
        <button
          onClick={handleCapture}
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
          Capture Screenshot
        </button>
        <button
          onClick={toggleAnnotationMode}
          className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90">
          {annotationMode ? "Disable" : "Enable"} Annotations
        </button>
        <button
          onClick={openPanel}
          className="w-full px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90">
          Open Side Panel
        </button>
      </div>
    </div>
  )
}

export default IndexPopup
