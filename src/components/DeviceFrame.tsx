import { useEffect, useRef, useState } from "react"
import type { DeviceFrameProps } from "~types"

export const DeviceFrame = ({
  url,
  width,
  height,
  scale,
  label,
  rotating = false
}: DeviceFrameProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [calculatedScale, setCalculatedScale] = useState(scale || 1)
  const [isRotated, setIsRotated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const currentWidth = isRotated ? height : width
  const currentHeight = isRotated ? width : height

  useEffect(() => {
    if (scale) {
      setCalculatedScale(scale)
      return
    }

    if (!containerRef.current) return

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const containerWidth = entry.contentRect.width
        const containerHeight = entry.contentRect.height

        const scaleX = containerWidth / currentWidth
        const scaleY = containerHeight / currentHeight
        const newScale = Math.min(scaleX, scaleY, 1)

        setCalculatedScale(newScale)
      }
    })

    observer.observe(containerRef.current)

    return () => observer.disconnect()
  }, [scale, currentWidth, currentHeight])

  const handleIframeLoad = () => {
    setIsLoading(false)
    setHasError(false)
  }

  const handleIframeError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  const handleRotate = () => {
    if (rotating) {
      setIsRotated(!isRotated)
    }
  }

  return (
    <div className="flex flex-col w-full h-full">
      {/* Device Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-secondary border-b border-border">
        <div className="flex items-center gap-3">
          {label && <span className="text-sm font-medium">{label}</span>}
          <span className="text-xs text-muted-foreground">
            {currentWidth} × {currentHeight}
          </span>
        </div>
        {rotating && (
          <button
            onClick={handleRotate}
            className="px-3 py-1 text-xs bg-background border border-border rounded hover:bg-accent transition-colors"
            aria-label="Rotate device">
            🔄 Rotate
          </button>
        )}
      </div>

      {/* Device Frame Container */}
      <div
        ref={containerRef}
        className="flex-1 flex items-center justify-center bg-muted overflow-hidden p-4">
        <div className="relative" style={{ width: currentWidth, height: currentHeight }}>
          {/* Loading Spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-muted-foreground">Loading...</span>
              </div>
            </div>
          )}

          {/* Error State */}
          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
              <div className="flex flex-col items-center gap-2 text-center p-4">
                <span className="text-2xl">⚠️</span>
                <span className="text-sm font-medium text-destructive">Failed to load</span>
                <span className="text-xs text-muted-foreground">
                  Unable to load {url}
                </span>
              </div>
            </div>
          )}

          {/* Iframe Wrapper with Scale */}
          <div
            className="origin-top-left transition-transform duration-300 ease-in-out"
            style={{
              width: currentWidth,
              height: currentHeight,
              transform: `scale(${calculatedScale})`
            }}>
            <iframe
              ref={iframeRef}
              src={url}
              sandbox="allow-scripts allow-same-origin allow-forms"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              className="w-full h-full border-0 bg-white"
              style={{
                width: currentWidth,
                height: currentHeight,
                pointerEvents: "auto"
              }}
              title={label || "Device Preview"}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
