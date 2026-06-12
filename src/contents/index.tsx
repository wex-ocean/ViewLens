import type { PlasmoCSConfig } from "plasmo"
import { useEffect } from "react"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  css: ["style.css"]
}

export const getShadowHostId = () => "viewlens-shadow-host"

const ContentScript = () => {
  useEffect(() => {
    console.log("ViewLens content script loaded")
  }, [])

  return (
    <div className="viewlens-content">
      {/* Content script UI will be added here */}
    </div>
  )
}

export default ContentScript
