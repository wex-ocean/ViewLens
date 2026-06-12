export interface ViewLensState {
  annotationMode: boolean
  screenshots: Screenshot[]
  settings: Settings
}

export interface Screenshot {
  id: string
  url: string
  timestamp: number
  dataUrl: string
  annotations?: Annotation[]
}

export interface Annotation {
  id: string
  type: "rectangle" | "circle" | "arrow" | "text"
  x: number
  y: number
  width?: number
  height?: number
  text?: string
  color: string
}

export interface Settings {
  theme: "light" | "dark"
  defaultAnnotationColor: string
  autoSave: boolean
}

export type StorageKey = "screenshots" | "settings" | "state"
