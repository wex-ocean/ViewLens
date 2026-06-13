import { create } from "zustand"
import type { Annotation, Screenshot, Settings } from "~types"
import type { DevicePreset } from "~utils/devices"
import type { BreakpointConfig } from "~utils/breakpoints"
import { DEVICE_PRESETS } from "~utils/devices"
import { storage } from "~utils/storage"

interface ViewLensStore {
  screenshots: Screenshot[]
  settings: Settings
  annotationMode: boolean
  selectedDevice: DevicePreset
  currentUrl: string
  isRotated: boolean
  activeMode: "dev" | "qa"
  customBreakpoints: BreakpointConfig[]
  isMultiScreen: boolean
  multiScreenDevices: DevicePreset[]
  isSyncScroll: boolean
  annotationTool: "rectangle" | "arrow" | "text" | "freehand"
  annotationColor: string
  currentAnnotations: Annotation[]
  undoStack: Annotation[][]
  redoStack: Annotation[][]
  isComparisonMode: boolean
  comparisonUrls: { left: string; right: string }
  comparisonLabels: { left: string; right: string }
  comparisonSyncScroll: boolean
  setScreenshots: (screenshots: Screenshot[]) => void
  addScreenshot: (screenshot: Screenshot) => void
  removeScreenshot: (id: string) => void
  updateScreenshot: (id: string, updates: Partial<Screenshot>) => void
  setSettings: (settings: Partial<Settings>) => void
  toggleAnnotationMode: () => void
  addAnnotation: (screenshotId: string, annotation: Annotation) => void
  setSelectedDevice: (device: DevicePreset) => void
  setCurrentUrl: (url: string) => void
  setIsRotated: (isRotated: boolean) => void
  setActiveMode: (mode: "dev" | "qa") => void
  setCustomBreakpoints: (breakpoints: BreakpointConfig[]) => void
  setIsMultiScreen: (isMultiScreen: boolean) => void
  addMultiScreenDevice: () => void
  removeMultiScreenDevice: () => void
  updateMultiScreenDevice: (index: number, device: DevicePreset) => void
  setIsSyncScroll: (isSyncScroll: boolean) => void
  setAnnotationTool: (tool: "rectangle" | "arrow" | "text" | "freehand") => void
  setAnnotationColor: (color: string) => void
  addCurrentAnnotation: (annotation: Annotation) => void
  setCurrentAnnotations: (annotations: Annotation[]) => void
  undo: () => void
  redo: () => void
  clearAnnotations: () => void
  setIsComparisonMode: (isComparisonMode: boolean) => void
  setComparisonUrls: (urls: { left: string; right: string }) => void
  setComparisonLabels: (labels: { left: string; right: string }) => void
  setComparisonSyncScroll: (sync: boolean) => void
}

export const useViewLensStore = create<ViewLensStore>((set) => ({
  screenshots: [],
  settings: {
    theme: "light",
    defaultAnnotationColor: "#FF0000",
    autoSave: true
  },
  annotationMode: false,
  selectedDevice: DEVICE_PRESETS.iphone14Pro,
  currentUrl: "https://example.com",
  isRotated: false,
  activeMode: "dev",
  customBreakpoints: [],
  isMultiScreen: false,
  multiScreenDevices: [DEVICE_PRESETS.iphone14Pro, DEVICE_PRESETS.ipadPro12],
  isSyncScroll: false,
  annotationTool: "rectangle",
  annotationColor: "#FF0000",
  currentAnnotations: [],
  undoStack: [],
  redoStack: [],
  isComparisonMode: false,
  comparisonUrls: { left: "https://example.com", right: "https://example.com" },
  comparisonLabels: { left: "Production", right: "Staging" },
  comparisonSyncScroll: true,

  setScreenshots: (screenshots) => set({ screenshots }),

  addScreenshot: (screenshot) =>
    set((state) => ({ screenshots: [...state.screenshots, screenshot] })),

  removeScreenshot: (id) =>
    set((state) => ({ screenshots: state.screenshots.filter((s) => s.id !== id) })),

  updateScreenshot: (id, updates) =>
    set((state) => ({
      screenshots: state.screenshots.map((s) => (s.id === id ? { ...s, ...updates } : s))
    })),

  setSettings: (settings) =>
    set((state) => ({ settings: { ...state.settings, ...settings } })),

  toggleAnnotationMode: () => set((state) => ({ annotationMode: !state.annotationMode })),

  addAnnotation: (screenshotId, annotation) =>
    set((state) => ({
      screenshots: state.screenshots.map((s) =>
        s.id === screenshotId
          ? { ...s, annotations: [...(s.annotations || []), annotation] }
          : s
      )
    })),

  setSelectedDevice: (device) => set({ selectedDevice: device }),

  setCurrentUrl: (url) => set({ currentUrl: url }),

  setIsRotated: (isRotated) => set({ isRotated }),

  setActiveMode: (mode) => {
    set({ activeMode: mode })
    storage.set("activeMode", mode)
  },

  setCustomBreakpoints: (breakpoints) => set({ customBreakpoints: breakpoints }),

  setIsMultiScreen: (isMultiScreen) => set({ isMultiScreen }),

  addMultiScreenDevice: () =>
    set((state) => {
      if (state.multiScreenDevices.length >= 4) return state
      return {
        multiScreenDevices: [...state.multiScreenDevices, DEVICE_PRESETS.mobile]
      }
    }),

  removeMultiScreenDevice: () =>
    set((state) => {
      if (state.multiScreenDevices.length <= 2) return state
      return {
        multiScreenDevices: state.multiScreenDevices.slice(0, -1)
      }
    }),

  updateMultiScreenDevice: (index, device) =>
    set((state) => ({
      multiScreenDevices: state.multiScreenDevices.map((d, i) => (i === index ? device : d))
    })),

  setIsSyncScroll: (isSyncScroll) => set({ isSyncScroll }),

  setAnnotationTool: (tool) => set({ annotationTool: tool }),

  setAnnotationColor: (color) => set({ annotationColor: color }),

  addCurrentAnnotation: (annotation) =>
    set((state) => ({
      undoStack: [...state.undoStack, state.currentAnnotations],
      redoStack: [],
      currentAnnotations: [...state.currentAnnotations, annotation]
    })),

  setCurrentAnnotations: (annotations) => set({ currentAnnotations: annotations }),

  undo: () =>
    set((state) => {
      if (state.undoStack.length === 0) return state
      const previous = state.undoStack[state.undoStack.length - 1]
      return {
        undoStack: state.undoStack.slice(0, -1),
        redoStack: [...state.redoStack, state.currentAnnotations],
        currentAnnotations: previous
      }
    }),

  redo: () =>
    set((state) => {
      if (state.redoStack.length === 0) return state
      const next = state.redoStack[state.redoStack.length - 1]
      return {
        undoStack: [...state.undoStack, state.currentAnnotations],
        redoStack: state.redoStack.slice(0, -1),
        currentAnnotations: next
      }
    }),

  clearAnnotations: () =>
    set((state) => ({
      undoStack: [...state.undoStack, state.currentAnnotations],
      redoStack: [],
      currentAnnotations: []
    })),

  setIsComparisonMode: (isComparisonMode) => set({ isComparisonMode }),

  setComparisonUrls: (urls) => set({ comparisonUrls: urls }),

  setComparisonLabels: (labels) => set({ comparisonLabels: labels }),

  setComparisonSyncScroll: (sync) => set({ comparisonSyncScroll: sync })
}))
