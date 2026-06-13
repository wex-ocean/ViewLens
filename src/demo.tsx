import "~style.css"
import { DeviceFrame, DeviceSelector, UrlBar } from "~components"
import { useViewLensStore } from "~store"

function DeviceFrameDemo() {
  const { selectedDevice, currentUrl, isRotated, setSelectedDevice, setCurrentUrl, setIsRotated } =
    useViewLensStore()

  return (
    <div className="w-full h-screen flex flex-col p-4 gap-4 bg-background">
      <div className="flex flex-col gap-4 p-4 bg-card border border-border rounded-lg">
        <h1 className="text-2xl font-bold">DeviceFrame Component Demo</h1>

        <div className="flex gap-4 items-start">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">URL</label>
            <UrlBar currentUrl={currentUrl} onUrlChange={setCurrentUrl} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Device</label>
            <DeviceSelector selectedDevice={selectedDevice} onSelect={setSelectedDevice} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Rotate</label>
            <button
              onClick={() => setIsRotated(!isRotated)}
              className="px-4 py-2 bg-secondary border border-border rounded-md hover:bg-accent transition-colors">
              {isRotated ? "Portrait" : "Landscape"}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 border border-border rounded-lg overflow-hidden bg-muted">
        <DeviceFrame
          url={currentUrl}
          width={isRotated ? selectedDevice.height : selectedDevice.width}
          height={isRotated ? selectedDevice.width : selectedDevice.height}
          label={selectedDevice.label}
          rotating
        />
      </div>
    </div>
  )
}

export default DeviceFrameDemo
