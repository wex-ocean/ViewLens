import { useState } from "react"
import { getDevicesByCategory } from "~utils/devices"
import type { DevicePreset } from "~utils/devices"

interface DeviceSelectorProps {
  selectedDevice: DevicePreset
  onSelect: (device: DevicePreset) => void
}

export const DeviceSelector = ({ selectedDevice, onSelect }: DeviceSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const categories = getDevicesByCategory()

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-64 px-4 py-2 bg-background border border-border rounded-md hover:bg-accent transition-colors">
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium">{selectedDevice.label}</span>
          <span className="text-xs text-muted-foreground">
            {selectedDevice.width} × {selectedDevice.height}
          </span>
        </div>
        <span className="text-xs">▼</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-1 w-80 bg-background border border-border rounded-md shadow-lg z-20 max-h-96 overflow-y-auto">
            {Object.entries(categories).map(([category, devices]) => (
              <div key={category} className="py-2">
                <div className="px-4 py-1 text-xs font-semibold text-muted-foreground uppercase">
                  {category}
                </div>
                {devices.map((device) => (
                  <button
                    key={device.label}
                    onClick={() => {
                      onSelect(device)
                      setIsOpen(false)
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-accent transition-colors ${
                      selectedDevice.label === device.label ? "bg-secondary" : ""
                    }`}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{device.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {device.width} × {device.height}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
