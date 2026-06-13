import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { DeviceSelector } from "../src/components/DeviceSelector"
import { DEVICE_PRESETS } from "../src/utils/devices"

describe("DeviceSelector", () => {
  it("displays selected device", () => {
    const device = DEVICE_PRESETS.iphone14Pro
    render(<DeviceSelector selectedDevice={device} onSelect={vi.fn()} />)
    expect(screen.getByText("iPhone 14 Pro")).toBeTruthy()
    expect(screen.getByText("393 × 852")).toBeTruthy()
  })

  it("opens dropdown on click", () => {
    const device = DEVICE_PRESETS.iphone14Pro
    render(<DeviceSelector selectedDevice={device} onSelect={vi.fn()} />)
    const button = screen.getByRole("button")
    fireEvent.click(button)
    expect(screen.getByText("APPLE")).toBeTruthy()
  })

  it("calls onSelect when device is chosen", () => {
    const onSelect = vi.fn()
    const device = DEVICE_PRESETS.iphone14Pro
    render(<DeviceSelector selectedDevice={device} onSelect={onSelect} />)
    const button = screen.getByRole("button")
    fireEvent.click(button)
    const pixel = screen.getByText("Pixel 7")
    fireEvent.click(pixel)
    expect(onSelect).toHaveBeenCalled()
  })
})
