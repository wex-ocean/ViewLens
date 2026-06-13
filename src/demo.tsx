import "~style.css"
import { useState } from "react"
import { DeviceFrame } from "~components"

const PRESET_DEVICES = [
  { label: "iPhone 14 Pro", width: 393, height: 852 },
  { label: "iPad Pro", width: 1024, height: 1366 },
  { label: "Desktop HD", width: 1920, height: 1080 },
  { label: "Galaxy S23", width: 360, height: 780 },
  { label: "MacBook Pro", width: 1440, height: 900 }
]

function DeviceFrameDemo() {
  const [url, setUrl] = useState("https://example.com")
  const [selectedDevice, setSelectedDevice] = useState(PRESET_DEVICES[0])

  return (
    <div className="w-full h-screen flex flex-col p-4 gap-4 bg-background">
      <div className="flex flex-col gap-4 p-4 bg-card border border-border rounded-lg">
        <h1 className="text-2xl font-bold">DeviceFrame Component Demo</h1>
        
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background"
              placeholder="Enter URL"
            />
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Device Preset</label>
            <select
              value={selectedDevice.label}
              onChange={(e) => {
                const device = PRESET_DEVICES.find((d) => d.label === e.target.value)
                if (device) setSelectedDevice(device)
              }}
              className="w-full px-3 py-2 border border-input rounded-md bg-background">
              {PRESET_DEVICES.map((device) => (
                <option key={device.label} value={device.label}>
                  {device.label} ({device.width}×{device.height})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex-1 border border-border rounded-lg overflow-hidden bg-muted">
        <DeviceFrame
          url={url}
          width={selectedDevice.width}
          height={selectedDevice.height}
          label={selectedDevice.label}
          rotating
        />
      </div>
    </div>
  )
}

export default DeviceFrameDemo
