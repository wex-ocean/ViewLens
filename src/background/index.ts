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
    chrome.sidePanel.open({ windowId: sender.tab?.windowId })
  }
})

chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
  .catch((error) => console.error(error))
