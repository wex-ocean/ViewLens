import { DeviceFrame } from "./DeviceFrame"
import { DeviceSelector } from "./DeviceSelector"
import type { DevicePreset } from "~utils/devices"

interface MultiScreenViewProps {
  url: string
  devices: DevicePreset[]
  onDeviceChange: (index: number, device: DevicePreset) => void
}

export const MultiScreenView = ({ url, devices, onDeviceChange }: MultiScreenViewProps) => {
  const gridCols = devices.length === 2 ? "grid-cols-2" : devices.length === 3 ? "grid-cols-3" : "grid-cols-2"
  
  return (
    <div className={`grid ${gridCols} gap-4 p-4 h-full`}>
      {devices.map((device, index) => (
        <div key={index} className="flex flex-col border border-border rounded-lg overflow-hidden bg-background">
          <div className="px-4 py-3 border-b border-border bg-muted/50 flex items-center justify-between">
            <span className="text-sm font-medium">Screen {index + 1}</span>
            <DeviceSelector
              selectedDevice={device}
              onSelect={(newDevice) => onDeviceChange(index, newDevice)}
            />
          </div>
          <div className="flex-1 overflow-hidden">
            <DeviceFrame
              url={url}
              width={device.width}
              height={device.height}
              label={device.label}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
