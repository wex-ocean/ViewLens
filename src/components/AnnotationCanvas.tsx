import { useEffect, useRef, useState } from "react"
import { Stage, Layer, Rect, Circle, Arrow, Line, Text } from "react-konva"
import type { Annotation } from "~types"

interface AnnotationCanvasProps {
  imageUrl?: string
  width: number
  height: number
  annotations?: Annotation[]
  tool?: "rectangle" | "arrow" | "text" | "freehand"
  color?: string
  onAnnotationAdd?: (annotation: Annotation) => void
  showAnnotations?: boolean
}

export const AnnotationCanvas = ({
  imageUrl,
  width,
  height,
  annotations = [],
  tool = "rectangle",
  color = "#FF0000",
  onAnnotationAdd,
  showAnnotations = true
}: AnnotationCanvasProps) => {
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentAnnotation, setCurrentAnnotation] = useState<Partial<Annotation> | null>(null)
  const stageRef = useRef<any>(null)

  const handleMouseDown = (e: any) => {
    if (!onAnnotationAdd) return
    const pos = e.target.getStage().getPointerPosition()
    setIsDrawing(true)
    
    const baseAnnotation = {
      id: crypto.randomUUID(),
      type: tool,
      x: pos.x,
      y: pos.y,
      color
    }

    if (tool === "freehand") {
      setCurrentAnnotation({
        ...baseAnnotation,
        points: [pos.x, pos.y]
      })
    } else if (tool === "text") {
      const text = prompt("Enter text:")
      if (text) {
        onAnnotationAdd({
          ...baseAnnotation,
          text
        } as Annotation)
      }
      setIsDrawing(false)
    } else {
      setCurrentAnnotation({
        ...baseAnnotation,
        width: 0,
        height: 0
      })
    }
  }

  const handleMouseMove = (e: any) => {
    if (!isDrawing || !currentAnnotation) return
    const pos = e.target.getStage().getPointerPosition()

    if (tool === "freehand" && currentAnnotation.points) {
      setCurrentAnnotation({
        ...currentAnnotation,
        points: [...currentAnnotation.points, pos.x, pos.y]
      })
    } else {
      setCurrentAnnotation({
        ...currentAnnotation,
        width: pos.x - currentAnnotation.x!,
        height: pos.y - currentAnnotation.y!
      })
    }
  }

  const handleMouseUp = () => {
    if (!isDrawing || !currentAnnotation || !onAnnotationAdd) return
    setIsDrawing(false)
    
    if (tool === "freehand" && currentAnnotation.points && currentAnnotation.points.length > 2) {
      onAnnotationAdd(currentAnnotation as Annotation)
    } else if (tool !== "freehand" && currentAnnotation.width !== 0 && currentAnnotation.height !== 0) {
      onAnnotationAdd(currentAnnotation as Annotation)
    }
    
    setCurrentAnnotation(null)
  }

  const renderAnnotation = (annotation: Annotation) => {
    if (!showAnnotations) return null

    switch (annotation.type) {
      case "rectangle":
        return (
          <Rect
            key={annotation.id}
            x={annotation.x}
            y={annotation.y}
            width={annotation.width || 0}
            height={annotation.height || 0}
            stroke={annotation.color}
            strokeWidth={2}
          />
        )
      case "circle":
        return (
          <Circle
            key={annotation.id}
            x={annotation.x}
            y={annotation.y}
            radius={Math.abs(annotation.width || 0) / 2}
            stroke={annotation.color}
            strokeWidth={2}
          />
        )
      case "arrow":
        return (
          <Arrow
            key={annotation.id}
            points={[
              annotation.x,
              annotation.y,
              annotation.x + (annotation.width || 0),
              annotation.y + (annotation.height || 0)
            ]}
            stroke={annotation.color}
            strokeWidth={2}
            pointerLength={10}
            pointerWidth={10}
          />
        )
      case "freehand":
        return (
          <Line
            key={annotation.id}
            points={annotation.points || []}
            stroke={annotation.color}
            strokeWidth={2}
            tension={0.5}
            lineCap="round"
            lineJoin="round"
          />
        )
      case "text":
        return (
          <Text
            key={annotation.id}
            x={annotation.x}
            y={annotation.y}
            text={annotation.text}
            fill={annotation.color}
            fontSize={16}
          />
        )
      default:
        return null
    }
  }

  return (
    <Stage
      ref={stageRef}
      width={width}
      height={height}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ position: "absolute", top: 0, left: 0, cursor: "crosshair" }}>
      <Layer>
        {annotations.map(renderAnnotation)}
        {currentAnnotation && renderAnnotation(currentAnnotation as Annotation)}
      </Layer>
    </Stage>
  )
}
