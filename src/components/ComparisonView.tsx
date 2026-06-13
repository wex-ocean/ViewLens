import { useState, useRef } from "react"
import { DeviceFrame } from "./DeviceFrame"
import type { DevicePreset } from "~utils/devices"

interface ComparisonViewProps {
  leftUrl: string
  rightUrl: string
  leftLabel: string
  rightLabel: string
  device: DevicePreset
  syncScroll?: boolean
}

export const ComparisonView = ({
  leftUrl,
  rightUrl,
  leftLabel,
  rightLabel,
  device,
  syncScroll = false
}: ComparisonViewProps) => {
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 })
  const lastScrollSourceRef = useRef<"left" | "right" | null>(null)

  const handleLeftScroll = (scrollX: number, scrollY: number) => {
    if (!syncScroll) return
    lastScrollSourceRef.current = "left"
    setScrollPosition({ x: scrollX, y: scrollY })
  }

  const handleRightScroll = (scrollX: number, scrollY: number) => {
    if (!syncScroll) return
    lastScrollSourceRef.current = "right"
    setScrollPosition({ x: scrollX, y: scrollY })
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-4 h-full">
      <div className="flex flex-col border border-border rounded-lg overflow-hidden bg-background">
        <div className="px-4 py-3 border-b border-border bg-muted/50">
          <span className="text-sm font-medium">{leftLabel}</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <DeviceFrame
            url={leftUrl}
            width={device.width}
            height={device.height}
            label={device.label}
            syncScroll={syncScroll}
            onScroll={handleLeftScroll}
            scrollTo={syncScroll && lastScrollSourceRef.current === "right" ? scrollPosition : undefined}
          />
        </div>
      </div>

      <div className="flex flex-col border border-border rounded-lg overflow-hidden bg-background">
        <div className="px-4 py-3 border-b border-border bg-muted/50">
          <span className="text-sm font-medium">{rightLabel}</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <DeviceFrame
            url={rightUrl}
            width={device.width}
            height={device.height}
            label={device.label}
            syncScroll={syncScroll}
            onScroll={handleRightScroll}
            scrollTo={syncScroll && lastScrollSourceRef.current === "left" ? scrollPosition : undefined}
          />
        </div>
      </div>
    </div>
  )
}
