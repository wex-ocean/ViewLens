import { useState } from "react"
import { CustomPresetManager, UrlHistory } from "~components"
import type { DevicePreset } from "~utils/devices"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  customPresets: DevicePreset[]
  urlHistory: Array<{ id: string; url: string; timestamp: number }>
  onAddPreset: (preset: DevicePreset) => void
  onDeletePreset: (id: string) => void
  onSelectUrl: (url: string) => void
  onDeleteUrl: (id: string) => void
  onClearHistory: () => void
}

export const SettingsModal = ({
  isOpen,
  onClose,
  customPresets,
  urlHistory,
  onAddPreset,
  onDeletePreset,
  onSelectUrl,
  onDeleteUrl,
  onClearHistory
}: SettingsModalProps) => {
  const [activeTab, setActiveTab] = useState<"presets" | "history">("presets")

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-background border border-border rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-bold">Settings</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted transition-colors">
              ×
            </button>
          </div>

          <div className="flex border-b border-border">
            <button
              onClick={() => setActiveTab("presets")}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "presets"
                  ? "border-b-2 border-primary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}>
              Custom Presets
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === "history"
                  ? "border-b-2 border-primary text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}>
              URL History
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === "presets" ? (
              <CustomPresetManager
                presets={customPresets}
                onAdd={onAddPreset}
                onDelete={onDeletePreset}
              />
            ) : (
              <UrlHistory
                history={urlHistory}
                onSelect={onSelectUrl}
                onDelete={onDeleteUrl}
                onClearAll={onClearHistory}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
