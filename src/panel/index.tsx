import "~style.css"
import { useEffect } from "react"
import {
  Navbar,
  DeviceFrame,
  DeviceSelector,
  UrlBar,
  BreakpointChecker,
  MultiScreenView,
  MultiScreenToolbar,
  ExportToolbar,
  AnnotationCanvas,
  AnnotationToolbar,
  ComparisonView,
  ComparisonToolbar
} from "~components"
import { useViewLensStore } from "~store"
import { storage } from "~utils/storage"
import { captureScreenshot, generateScreenshotFilename, downloadScreenshot } from "~utils/screenshot"
import { exportToPDF } from "~utils/pdf"
import { exportToZip } from "~utils/zipExport"
import { db } from "~utils/indexedDB"
import type { Screenshot } from "~types"

function IndexPanel() {
  const {
    activeMode,
    selectedDevice,
    currentUrl,
    isRotated,
    customBreakpoints,
    isMultiScreen,
    multiScreenDevices,
    isSyncScroll,
    annotationTool,
    annotationColor,
    currentAnnotations,
    undoStack,
    redoStack,
    isComparisonMode,
    comparisonUrls,
    comparisonLabels,
    comparisonSyncScroll,
    setActiveMode,
    setSelectedDevice,
    setCurrentUrl,
    setIsRotated,
    setCustomBreakpoints,
    setIsMultiScreen,
    addMultiScreenDevice,
    removeMultiScreenDevice,
    updateMultiScreenDevice,
    setIsSyncScroll,
    setAnnotationTool,
    setAnnotationColor,
    addCurrentAnnotation,
    setCurrentAnnotations,
    undo,
    redo,
    clearAnnotations,
    setIsComparisonMode,
    setComparisonUrls,
    setComparisonLabels,
    setComparisonSyncScroll
  } = useViewLensStore()

  useEffect(() => {
    storage.get<"dev" | "qa">("activeMode").then((mode) => {
      if (mode) setActiveMode(mode)
    })
  }, [])

  useEffect(() => {
    const loadAnnotations = async () => {
      const key = `${currentUrl}-${selectedDevice.label}`
      const annotations = await db.loadAnnotations(key)
      if (annotations.length > 0) {
        setCurrentAnnotations(annotations)
      }
    }
    loadAnnotations()
  }, [currentUrl, selectedDevice.label])

  const handleSaveAnnotations = async () => {
    const key = `${currentUrl}-${selectedDevice.label}`
    await db.saveAnnotations(key, currentAnnotations)
  }

  const currentWidth = isRotated ? selectedDevice.height : selectedDevice.width
  const currentHeight = isRotated ? selectedDevice.width : selectedDevice.height

  const handleScreenshotCurrent = async () => {
    const screenshot = await captureScreenshot(selectedDevice.label)
    const filename = generateScreenshotFilename(selectedDevice.label, screenshot.timestamp)
    downloadScreenshot(screenshot.dataUrl, filename)
  }

  const handleScreenshotAll = async () => {
    for (const device of multiScreenDevices) {
      const screenshot = await captureScreenshot(device.label)
      const filename = generateScreenshotFilename(device.label, screenshot.timestamp)
      downloadScreenshot(screenshot.dataUrl, filename)
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
  }

  const handleExportPDF = async () => {
    const screenshots: Screenshot[] = []
    const devices = isMultiScreen ? multiScreenDevices : [selectedDevice]
    
    for (const device of devices) {
      const screenshot = await captureScreenshot(device.label)
      screenshots.push(screenshot)
      await new Promise((resolve) => setTimeout(resolve, 300))
    }
    
    await exportToPDF(screenshots, currentUrl)
  }

  const handleExportZIP = async () => {
    const exports: any[] = []
    const devices = isMultiScreen ? multiScreenDevices : [selectedDevice]
    
    for (const device of devices) {
      const screenshot = await captureScreenshot(device.label)
      exports.push({
        deviceLabel: device.label,
        dataUrl: screenshot.dataUrl,
        timestamp: screenshot.timestamp
      })
      await new Promise((resolve) => setTimeout(resolve, 300))
    }
    
    await exportToZip(exports)
  }

  return (
    <div className="w-full h-screen flex flex-col bg-background">
      <Navbar activeMode={activeMode} onModeSwitch={setActiveMode} />

      {activeMode === "dev" ? (
        <div className="flex flex-1 flex-col overflow-hidden">
          <MultiScreenToolbar
            isMultiScreen={isMultiScreen}
            deviceCount={multiScreenDevices.length}
            isSyncScroll={isSyncScroll}
            onToggleMultiScreen={() => setIsMultiScreen(!isMultiScreen)}
            onAddDevice={addMultiScreenDevice}
            onRemoveDevice={removeMultiScreenDevice}
            onToggleSyncScroll={() => setIsSyncScroll(!isSyncScroll)}
          />

          <ExportToolbar
            isMultiScreen={isMultiScreen}
            onScreenshotCurrent={handleScreenshotCurrent}
            onScreenshotAll={handleScreenshotAll}
            onExportPDF={handleExportPDF}
            onExportZIP={handleExportZIP}
          />

          <div className="flex flex-1 overflow-hidden">
            {!isMultiScreen && (
              <div className="w-80 border-r border-border bg-muted/50 p-4 flex flex-col gap-4 overflow-y-auto">
                <div>
                  <label className="block text-sm font-medium mb-2">Device</label>
                  <DeviceSelector selectedDevice={selectedDevice} onSelect={setSelectedDevice} />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Rotate</span>
                  <button
                    onClick={() => setIsRotated(!isRotated)}
                    className={`px-3 py-1 text-xs rounded-md border transition-colors ${
                      isRotated
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border hover:bg-accent"
                    }`}>
                    {isRotated ? "Portrait" : "Landscape"}
                  </button>
                </div>

                <div className="pt-4 border-t border-border">
                  <h3 className="text-sm font-semibold mb-3">Device Info</h3>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Width:</span>
                      <span className="font-mono">{currentWidth}px</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Height:</span>
                      <span className="font-mono">{currentHeight}px</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Orientation:</span>
                      <span>{isRotated ? "Portrait" : "Landscape"}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <BreakpointChecker
                    currentWidth={currentWidth}
                    customBreakpoints={customBreakpoints}
                    onCustomBreakpointsChange={setCustomBreakpoints}
                  />
                </div>
              </div>
            )}

            <div className="flex-1 flex flex-col">
              {!isMultiScreen && (
                <div className="p-4 border-b border-border bg-background">
                  <UrlBar currentUrl={currentUrl} onUrlChange={setCurrentUrl} />
                </div>
              )}
              <div className="flex-1 overflow-hidden">
                {isMultiScreen ? (
                  <MultiScreenView
                    url={currentUrl}
                    devices={multiScreenDevices}
                    onDeviceChange={updateMultiScreenDevice}
                    syncScroll={isSyncScroll}
                  />
                ) : (
                  <DeviceFrame
                    url={currentUrl}
                    width={currentWidth}
                    height={currentHeight}
                    label={selectedDevice.label}
                    rotating
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsComparisonMode(false)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  !isComparisonMode
                    ? "bg-primary text-primary-foreground"
                    : "bg-background border border-border hover:bg-accent"
                }`}>
                Annotation
              </button>
              <button
                onClick={() => setIsComparisonMode(true)}
                className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                  isComparisonMode
                    ? "bg-primary text-primary-foreground"
                    : "bg-background border border-border hover:bg-accent"
                }`}>
                Comparison
              </button>
            </div>
          </div>

          {isComparisonMode ? (
            <div className="flex-1 flex flex-col overflow-hidden">
              <ComparisonToolbar
                leftUrl={comparisonUrls.left}
                rightUrl={comparisonUrls.right}
                leftLabel={comparisonLabels.left}
                rightLabel={comparisonLabels.right}
                selectedDevice={selectedDevice}
                syncScroll={comparisonSyncScroll}
                onLeftUrlChange={(url) => setComparisonUrls({ ...comparisonUrls, left: url })}
                onRightUrlChange={(url) => setComparisonUrls({ ...comparisonUrls, right: url })}
                onLeftLabelChange={(label) =>
                  setComparisonLabels({ ...comparisonLabels, left: label })
                }
                onRightLabelChange={(label) =>
                  setComparisonLabels({ ...comparisonLabels, right: label })
                }
                onDeviceChange={setSelectedDevice}
                onSwapUrls={() =>
                  setComparisonUrls({ left: comparisonUrls.right, right: comparisonUrls.left })
                }
                onToggleSyncScroll={() => setComparisonSyncScroll(!comparisonSyncScroll)}
              />
              <div className="flex-1 overflow-hidden">
                <ComparisonView
                  leftUrl={comparisonUrls.left}
                  rightUrl={comparisonUrls.right}
                  leftLabel={comparisonLabels.left}
                  rightLabel={comparisonLabels.right}
                  device={selectedDevice}
                  syncScroll={comparisonSyncScroll}
                />
              </div>
            </div>
          ) : (
            <>
              <AnnotationToolbar
                tool={annotationTool}
                color={annotationColor}
                showAnnotations={true}
                canUndo={undoStack.length > 0}
                canRedo={redoStack.length > 0}
                onToolChange={setAnnotationTool}
                onColorChange={setAnnotationColor}
                onToggleAnnotations={() => {}}
                onUndo={undo}
                onRedo={redo}
                onClear={clearAnnotations}
                onSave={handleSaveAnnotations}
              />

              <div className="flex-1 relative bg-muted/30">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                      <span className="text-3xl">✏️</span>
                    </div>
                    <h2 className="text-2xl font-bold">QA Annotation Mode</h2>
                    <p className="text-muted-foreground max-w-md">
                      Use the tools above to annotate screenshots. Draw rectangles, arrows, add
                      text, or freehand draw to mark bugs and issues.
                    </p>
                  </div>
                </div>

                <AnnotationCanvas
                  width={800}
                  height={600}
                  annotations={currentAnnotations}
                  tool={annotationTool}
                  color={annotationColor}
                  onAnnotationAdd={addCurrentAnnotation}
                  showAnnotations={true}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default IndexPanel
