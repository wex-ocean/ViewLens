import { describe, it, expect } from "vitest"
import { getActiveBreakpoint, getBreakpointLabel } from "../src/utils/breakpoints"

describe("Breakpoints Utility", () => {
  it("returns correct breakpoint for width", () => {
    expect(getActiveBreakpoint(320)).toBe("xs")
    expect(getActiveBreakpoint(640)).toBe("sm")
    expect(getActiveBreakpoint(768)).toBe("md")
    expect(getActiveBreakpoint(1024)).toBe("lg")
    expect(getActiveBreakpoint(1280)).toBe("xl")
    expect(getActiveBreakpoint(1536)).toBe("2xl")
  })

  it("handles custom breakpoints", () => {
    const custom = [
      { name: "mobile", width: 375 },
      { name: "tablet", width: 768 },
      { name: "desktop", width: 1280 }
    ]
    expect(getActiveBreakpoint(375, custom)).toBe("mobile")
    expect(getActiveBreakpoint(768, custom)).toBe("tablet")
    expect(getActiveBreakpoint(1280, custom)).toBe("desktop")
  })

  it("returns correct labels", () => {
    expect(getBreakpointLabel("xs")).toBe("< 640px")
    expect(getBreakpointLabel("sm")).toBe("640px")
    expect(getBreakpointLabel("md")).toBe("768px")
  })
})
