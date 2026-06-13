import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { ModeSwitch } from "../src/components/ModeSwitch"

describe("ModeSwitch", () => {
  it("renders both mode buttons", () => {
    render(<ModeSwitch activeMode="dev" onSwitch={vi.fn()} />)
    expect(screen.getByText("Dev Mode")).toBeTruthy()
    expect(screen.getByText("QA Mode")).toBeTruthy()
  })

  it("highlights active mode", () => {
    const { container } = render(<ModeSwitch activeMode="dev" onSwitch={vi.fn()} />)
    const devButton = screen.getByText("Dev Mode")
    expect(devButton.className).toContain("bg-background")
  })

  it("calls onSwitch when mode is clicked", () => {
    const onSwitch = vi.fn()
    render(<ModeSwitch activeMode="dev" onSwitch={onSwitch} />)
    const qaButton = screen.getByText("QA Mode")
    fireEvent.click(qaButton)
    expect(onSwitch).toHaveBeenCalledWith("qa")
  })
})
