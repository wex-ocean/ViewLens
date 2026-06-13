import "~style.css"
import { useEffect } from "react"
import { Navbar, DeviceFrame, DeviceSelector, UrlBar, BreakpointChecker } from "~components"
import { useViewLensStore } from "~store"
import { storage } from "~utils/storage"

function IndexPanel() {
  const {
    activeMode,
    selectedDevice,
    currentUrl,
    isRotated,
    customBreakpoints,
    setActiveMode,
    setSelectedDevice,
    setCurrentUrl,
    setIsRotated,
    setCustomBreakpoints
  } = useViewLensStore()

  useEffect(() => {
    storage.get<"dev" | "qa">("activeMode").then((mode) => {
      if (mode) setActiveMode(mode)
    })
  }, [])

  const currentWidth = isRotated ? selectedDevice.height : selectedDevice.width
  const currentHeight = isRotated ? selectedDevice.width : selectedDevice.height

  return (
    <div className="w-full h-screen flex flex-col bg-background">
      <Navbar activeMode={activeMode} onModeSwitch={setActiveMode} />

      {activeMode === "dev" ? (
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
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

          {/* Main Area */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-border bg-background">
              <UrlBar currentUrl={currentUrl} onUrlChange={setCurrentUrl} />
            </div>
            <div className="flex-1 overflow-hidden">
              <DeviceFrame
                url={currentUrl}
                width={currentWidth}
                height={currentHeight}
                label={selectedDevice.label}
                rotating
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-muted/30">
          <div className="text-center space-y-4 p-8">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
              <span className="text-3xl">🚧</span>
            </div>
            <h2 className="text-2xl font-bold">QA Mode Coming Soon</h2>
            <p className="text-muted-foreground max-w-md">
              QA Mode will provide comprehensive testing tools including screenshot comparisons,
              annotation features, and bug reporting workflows.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default IndexPanel
