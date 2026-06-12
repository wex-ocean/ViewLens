import "~style.css"
import { useViewLensStore } from "~store"

function IndexPanel() {
  const { screenshots } = useViewLensStore()

  return (
    <div className="w-full h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">ViewLens Panel</h1>
      <div className="space-y-2">
        {screenshots.length === 0 ? (
          <p className="text-muted-foreground">No screenshots yet</p>
        ) : (
          screenshots.map((screenshot) => (
            <div key={screenshot.id} className="border rounded-md p-2">
              <img src={screenshot.dataUrl} alt="Screenshot" className="w-full" />
              <p className="text-xs text-muted-foreground mt-2">
                {new Date(screenshot.timestamp).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default IndexPanel
