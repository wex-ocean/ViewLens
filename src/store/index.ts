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

  setCustomBreakpoints: (breakpoints) => set({ customBreakpoints: breakpoints })
}))
