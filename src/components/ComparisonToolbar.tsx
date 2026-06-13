import { DeviceSelector } from "./DeviceSelector"
import type { DevicePreset } from "~utils/devices"

interface ComparisonToolbarProps {
  leftUrl: string
  rightUrl: string
  leftLabel: string
  rightLabel: string
  selectedDevice: DevicePreset
  syncScroll: boolean
  onLeftUrlChange: (url: string) => void
  onRightUrlChange: (url: string) => void
  onLeftLabelChange: (label: string) => void
  onRightLabelChange: (label: string) => void
  onDeviceChange: (device: DevicePreset) => void
  onSwapUrls: () => void
  onToggleSyncScroll: () => void
}

export const ComparisonToolbar = ({
  leftUrl,
  rightUrl,
  leftLabel,
  rightLabel,
  selectedDevice,
  syncScroll,
  onLeftUrlChange,
  onRightUrlChange,
  onLeftLabelChange,
  onRightLabelChange,
  onDeviceChange,
  onSwapUrls,
  onToggleSyncScroll
}: ComparisonToolbarProps) => {
  return (
    <div className="flex flex-col gap-3 p-4 bg-muted/50 border-b border-border">
      <div className="flex items-center gap-4">
        <DeviceSelector selectedDevice={selectedDevice} onSelect={onDeviceChange} />
        
        <button
          onClick={onToggleSyncScroll}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded-md transition-colors ${
            syncScroll
              ? "bg-primary text-primary-foreground"
              : "bg-background border border-border hover:bg-accent"
          }`}
          title="Sync scroll">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M21 12a9 9 0 11-6.219-8.56" />
            <polyline points="17 8 21 4 21 8" />
          </svg>
          Sync Scroll
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <input
            type="text"
            value={leftLabel}
            onChange={(e) => onLeftLabelChange(e.target.value)}
            placeholder="Left label"
            className="w-full px-3 py-1.5 text-sm border border-border rounded-md bg-background"
          />
          <input
            type="text"
            value={leftUrl}
            onChange={(e) => onLeftUrlChange(e.target.value)}
            placeholder="Left URL"
            className="w-full px-3 py-2 border border-border rounded-md bg-background"
          />
        </div>

        <button
          onClick={onSwapUrls}
          className="self-center px-3 py-2 bg-background border border-border rounded-md hover:bg-accent transition-colors"
          title="Swap URLs">
          ⇄
        </button>

        <div className="space-y-2">
          <input
            type="text"
            value={rightLabel}
            onChange={(e) => onRightLabelChange(e.target.value)}
            placeholder="Right label"
            className="w-full px-3 py-1.5 text-sm border border-border rounded-md bg-background"
          />
          <input
            type="text"
            value={rightUrl}
            onChange={(e) => onRightUrlChange(e.target.value)}
            placeholder="Right URL"
            className="w-full px-3 py-2 border border-border rounded-md bg-background"
          />
        </div>
      </div>
    </div>
  )
}
