import { useEffect, useRef, useState } from "react"
import { Stage, Layer, Rect, Circle, Arrow, Text } from "react-konva"
import type { Annotation } from "~types"

interface AnnotationCanvasProps {
  imageUrl: string
  annotations?: Annotation[]
  onAnnotationAdd?: (annotation: Annotation) => void
}

export const AnnotationCanvas = ({
  imageUrl,
  annotations = [],
  onAnnotationAdd
}: AnnotationCanvasProps) => {
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setDimensions({ width: img.width, height: img.height })
    }
    img.src = imageUrl
  }, [imageUrl])

  return (
    <Stage width={dimensions.width} height={dimensions.height}>
      <Layer>
        {annotations.map((annotation) => {
          if (annotation.type === "rectangle") {
            return (
              <Rect
                key={annotation.id}
                x={annotation.x}
                y={annotation.y}
                width={annotation.width}
                height={annotation.height}
                stroke={annotation.color}
                strokeWidth={2}
              />
            )
          }
          if (annotation.type === "circle") {
            return (
              <Circle
                key={annotation.id}
                x={annotation.x}
                y={annotation.y}
                radius={annotation.width! / 2}
                stroke={annotation.color}
                strokeWidth={2}
              />
            )
          }
          if (annotation.type === "arrow") {
            return (
              <Arrow
                key={annotation.id}
                points={[annotation.x, annotation.y, annotation.x + annotation.width!, annotation.y + annotation.height!]}
                stroke={annotation.color}
                strokeWidth={2}
              />
            )
          }
          if (annotation.type === "text") {
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
          }
          return null
        })}
      </Layer>
    </Stage>
  )
}
