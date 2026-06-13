export interface DevicePreset {
  label: string
  width: number
  height: number
  userAgent?: string
}

export const DEVICE_PRESETS: Record<string, DevicePreset> = {
  // Apple Devices
  iphone14Pro: {
    label: "iPhone 14 Pro",
    width: 393,
    height: 852,
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1"
  },
  iphone14Plus: {
    label: "iPhone 14 Plus",
    width: 430,
    height: 932,
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1"
  },
  iphone13: {
    label: "iPhone 13",
    width: 390,
    height: 844,
    userAgent:
      "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"
  },
  ipadPro12: {
    label: "iPad Pro 12.9\"",
    width: 1024,
    height: 1366,
    userAgent:
      "Mozilla/5.0 (iPad; CPU OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1"
  },
  ipadAir: {
    label: "iPad Air",
    width: 820,
    height: 1180,
    userAgent:
      "Mozilla/5.0 (iPad; CPU OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1"
  },

  // Android Devices
  galaxyS23: {
    label: "Galaxy S23",
    width: 360,
    height: 780,
    userAgent:
      "Mozilla/5.0 (Linux; Android 13; SM-S911B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36"
  },
  galaxyS23Ultra: {
    label: "Galaxy S23 Ultra",
    width: 412,
    height: 915,
    userAgent:
      "Mozilla/5.0 (Linux; Android 13; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36"
  },
  pixel7: {
    label: "Pixel 7",
    width: 412,
    height: 915,
    userAgent:
      "Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36"
  },
  pixel7Pro: {
    label: "Pixel 7 Pro",
    width: 412,
    height: 892,
    userAgent:
      "Mozilla/5.0 (Linux; Android 13; Pixel 7 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36"
  },

  // Tablets
  galaxyTab: {
    label: "Galaxy Tab S8",
    width: 800,
    height: 1280,
    userAgent:
      "Mozilla/5.0 (Linux; Android 12; SM-X706B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
  },

  // Desktop & Laptop
  desktopHD: {
    label: "Desktop HD",
    width: 1920,
    height: 1080,
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
  },
  desktop4K: {
    label: "Desktop 4K",
    width: 3840,
    height: 2160,
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
  },
  macbookPro: {
    label: "MacBook Pro 16\"",
    width: 1440,
    height: 900,
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
  },
  macbookAir: {
    label: "MacBook Air",
    width: 1280,
    height: 800,
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
  },

  // Common Breakpoints
  mobile: {
    label: "Mobile",
    width: 375,
    height: 667
  },
  tablet: {
    label: "Tablet",
    width: 768,
    height: 1024
  },
  laptop: {
    label: "Laptop",
    width: 1366,
    height: 768
  },
  desktop: {
    label: "Desktop",
    width: 1920,
    height: 1080
  }
}

export const getDevicePreset = (key: string): DevicePreset | undefined => {
  return DEVICE_PRESETS[key]
}

export const getAllDevicePresets = (): DevicePreset[] => {
  return Object.values(DEVICE_PRESETS)
}

export const getDevicesByCategory = () => {
  return {
    apple: [
      DEVICE_PRESETS.iphone14Pro,
      DEVICE_PRESETS.iphone14Plus,
      DEVICE_PRESETS.iphone13,
      DEVICE_PRESETS.ipadPro12,
      DEVICE_PRESETS.ipadAir
    ],
    android: [
      DEVICE_PRESETS.galaxyS23,
      DEVICE_PRESETS.galaxyS23Ultra,
      DEVICE_PRESETS.pixel7,
      DEVICE_PRESETS.pixel7Pro,
      DEVICE_PRESETS.galaxyTab
    ],
    desktop: [
      DEVICE_PRESETS.macbookAir,
      DEVICE_PRESETS.macbookPro,
      DEVICE_PRESETS.desktopHD,
      DEVICE_PRESETS.desktop4K
    ],
    breakpoints: [
      DEVICE_PRESETS.mobile,
      DEVICE_PRESETS.tablet,
      DEVICE_PRESETS.laptop,
      DEVICE_PRESETS.desktop
    ]
  }
}
