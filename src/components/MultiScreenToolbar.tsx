interface MultiScreenToolbarProps {
  isMultiScreen: boolean
  deviceCount: number
  onToggleMultiScreen: () => void
  onAddDevice: () => void
  onRemoveDevice: () => void
}

export const MultiScreenToolbar = ({
  isMultiScreen,
  deviceCount,
  onToggleMultiScreen,
  onAddDevice,
  onRemoveDevice
}: MultiScreenToolbarProps) => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 border-b border-border">
      <button
        onClick={onToggleMultiScreen}
        className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-md transition-colors ${
          isMultiScreen
            ? "bg-primary text-primary-foreground"
            : "bg-background border border-border hover:bg-accent"
        }`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
        Multi-Screen
      </button>

      {isMultiScreen && (
        <>
          <div className="flex items-center gap-1 px-2 py-1 bg-background rounded-md border border-border">
            <span className="text-xs text-muted-foreground">Screens:</span>
            <span className="text-xs font-medium">{deviceCount}</span>
          </div>

          <div className="flex gap-1">
            <button
              onClick={onAddDevice}
              disabled={deviceCount >= 4}
              className="w-7 h-7 flex items-center justify-center rounded-md bg-background border border-border hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Add device">
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
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>

            <button
              onClick={onRemoveDevice}
              disabled={deviceCount <= 2}
              className="w-7 h-7 flex items-center justify-center rounded-md bg-background border border-border hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Remove device">
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
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  )
}
