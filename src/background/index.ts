export {}

chrome.runtime.onInstalled.addListener(() => {
  console.log("ViewLens extension installed")
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "CAPTURE_SCREENSHOT") {
    chrome.tabs.captureVisibleTab({ format: "png" }, (dataUrl) => {
      sendResponse({ dataUrl })
    })
    return true
  }

  if (message.type === "OPEN_SIDE_PANEL") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0]
      if (tab?.windowId) {
        chrome.sidePanel.open({ windowId: tab.windowId }).catch((error) => {
          console.error("Failed to open side panel:", error)
        })
      }
    })
  }
})

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error))
