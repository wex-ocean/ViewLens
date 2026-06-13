import { useState } from "react"
import { DeviceFrame } from "~components"
import { DEVICE_PRESETS } from "~utils/devices"

// Basic Usage
export function BasicExample() {
  return (
    <DeviceFrame
      url="https://example.com"
      width={375}
      height={667}
      label="iPhone"
    />
  )
}

// With Device Preset
export function PresetExample() {
  const device = DEVICE_PRESETS.iphone14Pro
  return (
    <DeviceFrame
      url="https://google.com"
      width={device.width}
      height={device.height}
      label={device.label}
      rotating
    />
  )
}

// Custom Scale
export function CustomScaleExample() {
  return (
    <DeviceFrame
      url="https://github.com"
      width={1920}
      height={1080}
      scale={0.5}
      label="Desktop HD (50%)"
    />
  )
}

// Multiple Devices Grid
export function MultiDeviceGrid() {
  const devices = [
    DEVICE_PRESETS.mobile,
    DEVICE_PRESETS.tablet,
    DEVICE_PRESETS.desktop
  ]

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {devices.map((device) => (
        <div key={device.label} className="border rounded-lg overflow-hidden">
          <DeviceFrame
            url="https://example.com"
            width={device.width}
            height={device.height}
            label={device.label}
          />
        </div>
      ))}
    </div>
  )
}

// With State Management
export function StatefulExample() {
  const [url, setUrl] = useState("https://example.com")
  const [device, setDevice] = useState(DEVICE_PRESETS.iphone14Pro)

  return (
    <div className="flex flex-col gap-4 p-4">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="px-3 py-2 border rounded"
        placeholder="Enter URL"
      />
      
      <select
        onChange={(e) => {
          const key = e.target.value as keyof typeof DEVICE_PRESETS
          setDevice(DEVICE_PRESETS[key])
        }}
        className="px-3 py-2 border rounded">
        {Object.keys(DEVICE_PRESETS).map((key) => (
          <option key={key} value={key}>
            {DEVICE_PRESETS[key as keyof typeof DEVICE_PRESETS].label}
          </option>
        ))}
      </select>

      <div className="flex-1 border rounded overflow-hidden">
        <DeviceFrame
          url={url}
          width={device.width}
          height={device.height}
          label={device.label}
          rotating
        />
      </div>
    </div>
  )
}

// Responsive Container
export function ResponsiveExample() {
  return (
    <div className="w-full h-screen p-4">
      <DeviceFrame
        url="https://example.com"
        width={1920}
        height={1080}
        label="Auto-scaled to fit"
      />
    </div>
  )
}
