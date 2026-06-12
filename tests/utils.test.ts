import { describe, it, expect } from "vitest"
import { storage } from "../src/utils/storage"

describe("Storage Utils", () => {
  it("should have get method", () => {
    expect(storage.get).toBeDefined()
  })

  it("should have set method", () => {
    expect(storage.set).toBeDefined()
  })

  it("should have remove method", () => {
    expect(storage.remove).toBeDefined()
  })
})
