import { useState } from "react"
import type { DevicePreset } from "~utils/devices"

interface CustomPresetManagerProps {
  presets: DevicePreset[]
  onAdd: (preset: DevicePreset) => void
  onDelete: (id: string) => void
}

export const CustomPresetManager = ({ presets, onAdd, onDelete }: CustomPresetManagerProps) => {
  const [name, setName] = useState("")
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")
  const [editId, setEditId] = useState<string | null>(null)

  const handleSubmit = () => {
    if (!name || !width || !height) return

    const preset: DevicePreset = {
      id: editId || crypto.randomUUID(),
      label: name,
      width: parseInt(width),
      height: parseInt(height)
    }

    onAdd(preset)
    setName("")
    setWidth("")
    setHeight("")
    setEditId(null)
  }

  const handleEdit = (preset: DevicePreset) => {
    setName(preset.label)
    setWidth(preset.width.toString())
    setHeight(preset.height.toString())
    setEditId(preset.label)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3 p-4 border border-border rounded-lg bg-muted/30">
        <h3 className="text-sm font-semibold">
          {editId ? "Edit Custom Preset" : "Add Custom Preset"}
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-3 py-2 text-sm border border-border rounded-md bg-background"
          />
          <input
            type="number"
            placeholder="Width (px)"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="px-3 py-2 text-sm border border-border rounded-md bg-background"
          />
          <input
            type="number"
            placeholder="Height (px)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="px-3 py-2 text-sm border border-border rounded-md bg-background"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full px-4 py-2 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
          {editId ? "Update Preset" : "Add Preset"}
        </button>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Custom Presets ({presets.length})</h3>
        {presets.length === 0 ? (
          <p className="text-sm text-muted-foreground">No custom presets yet</p>
        ) : (
          <div className="space-y-2">
            {presets.map((preset) => (
              <div
                key={preset.label}
                className="flex items-center justify-between p-3 border border-border rounded-md bg-background">
                <div>
                  <span className="text-sm font-medium">{preset.label}</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    {preset.width} × {preset.height}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(preset)}
                    className="px-3 py-1 text-xs bg-secondary rounded-md hover:bg-secondary/80">
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(preset.label)}
                    className="px-3 py-1 text-xs bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
