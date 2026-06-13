export interface Breakpoint {
  name: string
  minWidth: number
  maxWidth?: number
}

export interface BreakpointConfig {
  name: string
  width: number
}

export const DEFAULT_BREAKPOINTS: Breakpoint[] = [
  { name: "xs", minWidth: 0, maxWidth: 639 },
  { name: "sm", minWidth: 640, maxWidth: 767 },
  { name: "md", minWidth: 768, maxWidth: 1023 },
  { name: "lg", minWidth: 1024, maxWidth: 1279 },
  { name: "xl", minWidth: 1280, maxWidth: 1535 },
  { name: "2xl", minWidth: 1536 }
]

export const getActiveBreakpoint = (
  width: number,
  customBreakpoints?: BreakpointConfig[]
): string => {
  if (customBreakpoints && customBreakpoints.length > 0) {
    const sorted = [...customBreakpoints].sort((a, b) => b.width - a.width)
    for (const bp of sorted) {
      if (width >= bp.width) {
        return bp.name
      }
    }
    return sorted[sorted.length - 1]?.name || "custom"
  }

  for (let i = DEFAULT_BREAKPOINTS.length - 1; i >= 0; i--) {
    const bp = DEFAULT_BREAKPOINTS[i]
    if (width >= bp.minWidth && (!bp.maxWidth || width <= bp.maxWidth)) {
      return bp.name
    }
  }

  return "xs"
}

export const getBreakpointLabel = (name: string): string => {
  const labels: Record<string, string> = {
    xs: "< 640px",
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px"
  }
  return labels[name] || name
}

export const getAllBreakpoints = (customBreakpoints?: BreakpointConfig[]): Breakpoint[] => {
  if (customBreakpoints && customBreakpoints.length > 0) {
    return customBreakpoints.map((bp) => ({
      name: bp.name,
      minWidth: bp.width
    }))
  }
  return DEFAULT_BREAKPOINTS
}
