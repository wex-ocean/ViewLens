import { useState, useRef, useEffect } from "react"
import { DeviceFrame } from "./DeviceFrame"
import { DeviceSelector } from "./DeviceSelector"
import type { DevicePreset } from "~utils/devices"

interface MultiScreenViewProps {
  url: string
  devices: DevicePreset[]
  onDeviceChange: (index: number, device: DevicePreset) => void
  syncScroll?: boolean
}

export const MultiScreenView = ({ url, devices, onDeviceChange, syncScroll = false }: MultiScreenViewProps) => {
  const gridCols = devices.length === 2 ? "grid-cols-2" : devices.length === 3 ? "grid-cols-3" : "grid-cols-2"
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 })
  const lastScrollSourceRef = useRef<number | null>(null)
  
  const handleScroll = (sourceIndex: number) => (scrollX: number, scrollY: number) => {
    if (!syncScroll) return
    lastScrollSourceRef.current = sourceIndex
    setScrollPosition({ x: scrollX, y: scrollY })
  }

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
              syncScroll={syncScroll}
              onScroll={handleScroll(index)}
              scrollTo={syncScroll && lastScrollSourceRef.current !== index ? scrollPosition : undefined}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
