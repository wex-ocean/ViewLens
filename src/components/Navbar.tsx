import { ModeSwitch } from "./ModeSwitch"

interface NavbarProps {
  activeMode: "dev" | "qa"
  onModeSwitch: (mode: "dev" | "qa") => void
}

export const Navbar = ({ activeMode, onModeSwitch }: NavbarProps) => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-background border-b border-border">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-lg">V</span>
        </div>
        <h1 className="text-xl font-bold">ViewLens</h1>
      </div>

      <ModeSwitch activeMode={activeMode} onSwitch={onModeSwitch} />

      <button
        className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
        aria-label="Settings">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3" />
        </svg>
      </button>
    </nav>
  )
}
