import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { DeviceFrame } from "../src/components/DeviceFrame"

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))

describe("DeviceFrame", () => {
  it("renders iframe with correct URL", () => {
    const { container } = render(
      <DeviceFrame url="https://example.com" width={375} height={667} />
    )
    const iframe = container.querySelector("iframe")
    expect(iframe).toBeTruthy()
    expect(iframe?.src).toBe("https://example.com/")
  })

  it("displays device dimensions", () => {
    render(<DeviceFrame url="https://example.com" width={375} height={667} />)
    expect(screen.getByText("375 × 667")).toBeTruthy()
  })

  it("shows label when provided", () => {
    render(
      <DeviceFrame url="https://example.com" width={375} height={667} label="iPhone 14" />
    )
    expect(screen.getByText("iPhone 14")).toBeTruthy()
  })

  it("shows rotate button when rotating is enabled", () => {
    render(
      <DeviceFrame url="https://example.com" width={375} height={667} rotating />
    )
    expect(screen.getByLabelText("Rotate device")).toBeTruthy()
  })

  it("applies correct sandbox attributes", () => {
    const { container } = render(
      <DeviceFrame url="https://example.com" width={375} height={667} />
    )
    const iframe = container.querySelector("iframe")
    expect(iframe?.sandbox.contains("allow-scripts")).toBe(true)
    expect(iframe?.sandbox.contains("allow-same-origin")).toBe(true)
    expect(iframe?.sandbox.contains("allow-forms")).toBe(true)
  })

  it("shows loading state initially", () => {
    render(<DeviceFrame url="https://example.com" width={375} height={667} />)
    expect(screen.getByText("Loading...")).toBeTruthy()
  })
})
