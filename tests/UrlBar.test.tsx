import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { UrlBar } from "../src/components/UrlBar"

describe("UrlBar", () => {
  it("renders input with current URL", () => {
    render(<UrlBar currentUrl="https://example.com" onUrlChange={vi.fn()} />)
    const input = screen.getByPlaceholderText(/Enter URL/i) as HTMLInputElement
    expect(input.value).toBe("https://example.com")
  })

  it("calls onUrlChange when Load button is clicked", () => {
    const onUrlChange = vi.fn()
    render(<UrlBar currentUrl="https://example.com" onUrlChange={onUrlChange} />)
    const input = screen.getByPlaceholderText(/Enter URL/i)
    const button = screen.getByText("Load")
    
    fireEvent.change(input, { target: { value: "google.com" } })
    fireEvent.click(button)
    
    expect(onUrlChange).toHaveBeenCalledWith("https://google.com")
  })

  it("shows error for invalid URL", () => {
    render(<UrlBar currentUrl="" onUrlChange={vi.fn()} />)
    const button = screen.getByText("Load")
    fireEvent.click(button)
    expect(screen.getByText("Please enter a URL")).toBeTruthy()
  })

  it("handles Enter key press", () => {
    const onUrlChange = vi.fn()
    render(<UrlBar currentUrl="" onUrlChange={onUrlChange} />)
    const input = screen.getByPlaceholderText(/Enter URL/i)
    
    fireEvent.change(input, { target: { value: "example.com" } })
    fireEvent.keyDown(input, { key: "Enter" })
    
    expect(onUrlChange).toHaveBeenCalledWith("https://example.com")
  })
})
