interface ModeSwitchProps {
  activeMode: "dev" | "qa"
  onSwitch: (mode: "dev" | "qa") => void
}

export const ModeSwitch = ({ activeMode, onSwitch }: ModeSwitchProps) => {
  return (
    <div className="inline-flex bg-muted rounded-lg p-1">
      <button
        onClick={() => onSwitch("dev")}
        className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${
          activeMode === "dev"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}>
        Dev Mode
      </button>
      <button
        onClick={() => onSwitch("qa")}
        className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${
          activeMode === "qa"
            ? "bg-background text-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}>
        QA Mode
      </button>
    </div>
  )
}
