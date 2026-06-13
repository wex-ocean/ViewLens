import { useState } from "react"
import { getActiveBreakpoint, getBreakpointLabel, DEFAULT_BREAKPOINTS } from "~utils/breakpoints"
import type { BreakpointConfig } from "~utils/breakpoints"

interface BreakpointCheckerProps {
  currentWidth: number
  customBreakpoints?: BreakpointConfig[]
  onCustomBreakpointsChange?: (breakpoints: BreakpointConfig[]) => void
}

export const BreakpointChecker = ({
  currentWidth,
  customBreakpoints = [],
  onCustomBreakpointsChange
}: BreakpointCheckerProps) => {
  const [showCustomInput, setShowCustomInput] = useState(false)
  const [newBpName, setNewBpName] = useState("")
  const [newBpWidth, setNewBpWidth] = useState("")

  const activeBreakpoint = getActiveBreakpoint(currentWidth, customBreakpoints)
  const breakpointsToShow = customBreakpoints.length > 0 ? customBreakpoints : DEFAULT_BREAKPOINTS

  const handleAddBreakpoint = () => {
    const width = parseInt(newBpWidth)
    if (!newBpName || !width || isNaN(width)) return

    const newBreakpoints = [...customBreakpoints, { name: newBpName, width }].sort(
      (a, b) => a.width - b.width
    )
    onCustomBreakpointsChange?.(newBreakpoints)
    setNewBpName("")
    setNewBpWidth("")
    setShowCustomInput(false)
  }

  const handleRemoveBreakpoint = (name: string) => {
    const filtered = customBreakpoints.filter((bp) => bp.name !== name)
    onCustomBreakpointsChange?.(filtered)
  }

  const handleResetToDefaults = () => {
    onCustomBreakpointsChange?.([])
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Active Breakpoint</h3>
        {customBreakpoints.length > 0 && (
          <button
            onClick={handleResetToDefaults}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Reset
          </button>
        )}
      </div>

      <div className="inline-flex px-3 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-md">
        {activeBreakpoint} ({currentWidth}px)
      </div>

      <div className="space-y-2">
        <div className="text-xs font-medium text-muted-foreground">All Breakpoints</div>
        <div className="flex flex-wrap gap-2">
          {breakpointsToShow.map((bp) => {
            const bpName = "name" in bp ? bp.name : bp.name
            const bpWidth = "width" in bp ? bp.width : bp.minWidth
            const isActive = activeBreakpoint === bpName

            return (
              <div
                key={bpName}
                className={`relative inline-flex items-center gap-2 px-2 py-1 text-xs rounded border transition-colors ${
                  isActive
                    ? "bg-secondary border-primary text-foreground"
                    : "bg-background border-border text-muted-foreground"
                }`}>
                <span className="font-mono">{bpName}</span>
                <span className="text-[10px]">
                  {customBreakpoints.length > 0 ? `${bpWidth}px` : getBreakpointLabel(bpName)}
                </span>
                {customBreakpoints.length > 0 && (
                  <button
                    onClick={() => handleRemoveBreakpoint(bpName)}
                    className="ml-1 hover:text-destructive transition-colors">
                    ×
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {!showCustomInput ? (
        <button
          onClick={() => setShowCustomInput(true)}
          className="w-full px-3 py-2 text-xs border border-dashed border-border rounded-md hover:bg-accent transition-colors">
          + Add Custom Breakpoint
        </button>
      ) : (
        <div className="space-y-2 p-3 border border-border rounded-md bg-muted/50">
          <input
            type="text"
            placeholder="Name (e.g., tablet)"
            value={newBpName}
            onChange={(e) => setNewBpName(e.target.value)}
            className="w-full px-2 py-1 text-xs border border-border rounded bg-background"
          />
          <input
            type="number"
            placeholder="Width (px)"
            value={newBpWidth}
            onChange={(e) => setNewBpWidth(e.target.value)}
            className="w-full px-2 py-1 text-xs border border-border rounded bg-background"
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddBreakpoint}
              className="flex-1 px-2 py-1 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90">
              Add
            </button>
            <button
              onClick={() => {
                setShowCustomInput(false)
                setNewBpName("")
                setNewBpWidth("")
              }}
              className="flex-1 px-2 py-1 text-xs border border-border rounded hover:bg-accent">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
