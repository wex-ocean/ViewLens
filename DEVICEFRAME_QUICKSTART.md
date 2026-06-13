# DeviceFrame Quick Start

## Installation

The DeviceFrame component is already set up in your ViewLens project.

## Import

```typescript
import { DeviceFrame } from "~components"
import { DEVICE_PRESETS } from "~utils/devices"
```

## Basic Usage

```tsx
<DeviceFrame
  url="https://example.com"
  width={375}
  height={667}
  label="iPhone"
  rotating
/>
```

## Available Device Presets

```typescript
// Apple
DEVICE_PRESETS.iphone14Pro      // 393×852
DEVICE_PRESETS.iphone14Plus     // 430×932
DEVICE_PRESETS.iphone13         // 390×844
DEVICE_PRESETS.ipadPro12        // 1024×1366
DEVICE_PRESETS.ipadAir          // 820×1180

// Android
DEVICE_PRESETS.galaxyS23        // 360×780
DEVICE_PRESETS.galaxyS23Ultra   // 412×915
DEVICE_PRESETS.pixel7           // 412×915
DEVICE_PRESETS.pixel7Pro        // 412×892
DEVICE_PRESETS.galaxyTab        // 800×1280

// Desktop
DEVICE_PRESETS.macbookAir       // 1280×800
DEVICE_PRESETS.macbookPro       // 1440×900
DEVICE_PRESETS.desktopHD        // 1920×1080
DEVICE_PRESETS.desktop4K        // 3840×2160

// Breakpoints
DEVICE_PRESETS.mobile           // 375×667
DEVICE_PRESETS.tablet           // 768×1024
DEVICE_PRESETS.laptop           // 1366×768
DEVICE_PRESETS.desktop          // 1920×1080
```

## Examples

### Single Device
```tsx
const device = DEVICE_PRESETS.iphone14Pro
<DeviceFrame
  url="https://your-site.com"
  width={device.width}
  height={device.height}
  label={device.label}
  rotating
/>
```

### Multiple Devices
```tsx
const devices = [
  DEVICE_PRESETS.mobile,
  DEVICE_PRESETS.tablet,
  DEVICE_PRESETS.desktop
]

<div className="grid grid-cols-3 gap-4">
  {devices.map(device => (
    <DeviceFrame
      key={device.label}
      url="https://your-site.com"
      width={device.width}
      height={device.height}
      label={device.label}
    />
  ))}
</div>
```

### With Custom Scale
```tsx
<DeviceFrame
  url="https://example.com"
  width={1920}
  height={1080}
  scale={0.5}
  label="Desktop at 50%"
/>
```

## Features

✅ Auto-scales to fit container  
✅ Rotate button (portrait/landscape)  
✅ Loading spinner  
✅ Error handling  
✅ Sandbox security  
✅ TypeScript support  

## Testing

```bash
npm test DeviceFrame.test.tsx
```

## Demo

```bash
npm run dev
# Navigate to demo.tsx in your extension
```

## Props Reference

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| url | string | ✅ | URL to load in iframe |
| width | number | ✅ | Device width in pixels |
| height | number | ✅ | Device height in pixels |
| scale | number | ❌ | Manual scale (auto if omitted) |
| label | string | ❌ | Device name label |
| rotating | boolean | ❌ | Enable rotation toggle |

## Files Created

```
src/
├── components/
│   ├── DeviceFrame.tsx              ✅ Main component
│   ├── DeviceFrame.README.md        ✅ Documentation
│   └── index.ts                     ✅ Exports
├── utils/
│   └── devices.ts                   ✅ Device presets
├── types/
│   └── index.ts                     ✅ TypeScript types
├── examples/
│   └── DeviceFrameExamples.tsx      ✅ Usage examples
├── demo.tsx                         ✅ Interactive demo
tests/
└── DeviceFrame.test.tsx             ✅ Unit tests
DEVICEFRAME.md                       ✅ Full documentation
```

## Status

🟢 **Ready to use** - All features implemented and tested
