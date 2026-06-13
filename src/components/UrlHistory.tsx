interface UrlHistoryProps {
  history: Array<{ id: string; url: string; timestamp: number }>
  onSelect: (url: string) => void
  onDelete: (id: string) => void
  onClearAll: () => void
}

export const UrlHistory = ({ history, onSelect, onDelete, onClearAll }: UrlHistoryProps) => {
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">URL History ({history.length}/20)</h3>
        {history.length > 0 && (
          <button
            onClick={onClearAll}
            className="px-3 py-1 text-xs bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90">
            Clear All
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p className="text-sm text-muted-foreground">No URL history yet</p>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {history.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 border border-border rounded-md bg-background hover:bg-muted/50 transition-colors">
              <button
                onClick={() => onSelect(item.url)}
                className="flex-1 text-left min-w-0">
                <div className="text-sm font-medium truncate">{item.url}</div>
                <div className="text-xs text-muted-foreground">{formatTimestamp(item.timestamp)}</div>
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="ml-2 px-2 py-1 text-xs text-destructive hover:bg-destructive/10 rounded">
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
