interface AnnotationToolbarProps {
  tool: "rectangle" | "arrow" | "text" | "freehand"
  color: string
  showAnnotations: boolean
  canUndo: boolean
  canRedo: boolean
  onToolChange: (tool: "rectangle" | "arrow" | "text" | "freehand") => void
  onColorChange: (color: string) => void
  onToggleAnnotations: () => void
  onUndo: () => void
  onRedo: () => void
  onClear: () => void
  onSave: () => void
}

export const AnnotationToolbar = ({
  tool,
  color,
  showAnnotations,
  canUndo,
  canRedo,
  onToolChange,
  onColorChange,
  onToggleAnnotations,
  onUndo,
  onRedo,
  onClear,
  onSave
}: AnnotationToolbarProps) => {
  const tools = [
    { value: "rectangle", label: "Rectangle", icon: "▭" },
    { value: "arrow", label: "Arrow", icon: "→" },
    { value: "text", label: "Text", icon: "T" },
    { value: "freehand", label: "Draw", icon: "✎" }
  ] as const

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-muted/50 border-b border-border">
      <span className="text-sm font-medium text-muted-foreground">Annotate:</span>

      {tools.map((t) => (
        <button
          key={t.value}
          onClick={() => onToolChange(t.value)}
          className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
            tool === t.value
              ? "bg-primary text-primary-foreground"
              : "bg-background border border-border hover:bg-accent"
          }`}
          title={t.label}>
          {t.icon}
        </button>
      ))}

      <div className="w-px h-6 bg-border" />

      <input
        type="color"
        value={color}
        onChange={(e) => onColorChange(e.target.value)}
        className="w-10 h-7 border border-border rounded cursor-pointer"
        title="Annotation color"
      />

      <div className="w-px h-6 bg-border" />

      <button
        onClick={onUndo}
        disabled={!canUndo}
        className="px-3 py-1.5 text-sm bg-background border border-border rounded-md hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Undo">
        ↶
      </button>

      <button
        onClick={onRedo}
        disabled={!canRedo}
        className="px-3 py-1.5 text-sm bg-background border border-border rounded-md hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title="Redo">
        ↷
      </button>

      <div className="w-px h-6 bg-border" />

      <button
        onClick={onToggleAnnotations}
        className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
          showAnnotations
            ? "bg-primary text-primary-foreground"
            : "bg-background border border-border hover:bg-accent"
        }`}
        title="Toggle annotations visibility">
        {showAnnotations ? "👁" : "👁‍🗨"}
      </button>

      <button
        onClick={onClear}
        className="px-3 py-1.5 text-xs bg-background border border-border rounded-md hover:bg-destructive hover:text-destructive-foreground transition-colors"
        title="Clear all annotations">
        Clear
      </button>

      <button
        onClick={onSave}
        className="px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        title="Save annotations">
        Save
      </button>
    </div>
  )
}
