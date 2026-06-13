# DeviceFrame Component

A responsive iframe renderer with device emulation capabilities for ViewLens Chrome Extension.

## Features

✅ **Responsive iframe rendering** - Auto-scales to fit container  
✅ **Device emulation** - Custom width/height with device chrome  
✅ **Portrait/Landscape rotation** - Toggle orientation  
✅ **Auto-scale calculation** - Uses ResizeObserver for dynamic scaling  
✅ **Loading states** - Spinner while iframe loads  
✅ **Error handling** - User-friendly error display  
✅ **Sandbox security** - Safe iframe with restricted permissions  
✅ **CSS isolation** - No style leaking  
✅ **TypeScript** - Full type safety  

## Usage

```tsx
import { DeviceFrame } from "~components"

function App() {
  return (
    <DeviceFrame
      url="https://example.com"
      width={375}
      height={667}
      label="iPhone 14"
      rotating
    />
  )
}
```

## Props

### `url: string` (required)
Target URL to load inside iframe.

```tsx
<DeviceFrame url="https://google.com" width={375} height={667} />
```

### `width: number` (required)
Device width in pixels.

```tsx
<DeviceFrame url="https://example.com" width={375} height={667} />
```

### `height: number` (required)
Device height in pixels.

```tsx
<DeviceFrame url="https://example.com" width={375} height={667} />
```

### `scale?: number` (optional)
Manual scale override. If not provided, auto-calculated to fit container.

```tsx
<DeviceFrame url="https://example.com" width={375} height={667} scale={0.5} />
```

### `label?: string` (optional)
Device name label displayed in toolbar.

```tsx
<DeviceFrame 
  url="https://example.com" 
  width={375} 
  height={667} 
  label="iPhone 14 Pro" 
/>
```

### `rotating?: boolean` (optional, default: false)
Enable portrait/landscape rotation toggle.

```tsx
<DeviceFrame 
  url="https://example.com" 
  width={375} 
  height={667} 
  rotating 
/>
```

## Device Presets

Common device dimensions for quick testing:

```tsx
const DEVICES = {
  iphone14: { width: 393, height: 852, label: "iPhone 14 Pro" },
  iphone14Plus: { width: 430, height: 932, label: "iPhone 14 Plus" },
  ipadPro: { width: 1024, height: 1366, label: "iPad Pro 12.9" },
  galaxyS23: { width: 360, height: 780, label: "Galaxy S23" },
  pixel7: { width: 412, height: 915, label: "Pixel 7" },
  desktop: { width: 1920, height: 1080, label: "Desktop HD" },
  laptop: { width: 1440, height: 900, label: "MacBook Pro" }
}
```

## Implementation Details

### Auto-Scale Calculation

Uses `ResizeObserver` to watch container size changes:

```typescript
const scaleX = containerWidth / deviceWidth
const scaleY = containerHeight / deviceHeight
const scale = Math.min(scaleX, scaleY, 1) // Never scale up
```

### CSS Transform

Applies scale using `transform: scale()` with `transform-origin: top left`:

```tsx
<div
  style={{
    transform: `scale(${calculatedScale})`,
    transformOrigin: "top left",
    transition: "transform 300ms ease-in-out"
  }}>
  <iframe src={url} />
</div>
```

### Iframe Sandbox

Security-restricted iframe with minimal permissions:

```tsx
<iframe
  sandbox="allow-scripts allow-same-origin allow-forms"
  src={url}
/>
```

**Allowed:**
- `allow-scripts` - JavaScript execution
- `allow-same-origin` - Same-origin access
- `allow-forms` - Form submission

**Blocked:**
- Popups
- Top-level navigation
- Pointer lock
- Downloads

### Loading States

Three states managed internally:

1. **Loading** - Shows spinner while iframe loads
2. **Loaded** - Iframe content displayed
3. **Error** - Error message if URL fails

### Rotation Logic

When `rotating={true}`:
- Swaps width/height on button click
- Updates dimensions display
- Smooth transition with CSS

```typescript
const currentWidth = isRotated ? height : width
const currentHeight = isRotated ? width : height
```

## Styling

### Tailwind Classes Used

- `flex`, `flex-col` - Layout
- `bg-secondary`, `bg-muted` - Backgrounds
- `border-border` - Borders
- `text-muted-foreground` - Text colors
- `hover:bg-accent` - Hover states
- `transition-colors`, `transition-transform` - Animations
- `animate-spin` - Loading spinner

### Custom Styles

```css
.origin-top-left {
  transform-origin: top left;
}

.transition-transform {
  transition: transform 300ms ease-in-out;
}
```

## Error Handling

### Iframe Load Failure

If iframe fails to load (CORS, network error):

```tsx
⚠️
Failed to load
Unable to load https://example.com
```

### ResizeObserver Cleanup

Properly disconnects observer on unmount:

```typescript
useEffect(() => {
  const observer = new ResizeObserver(...)
  observer.observe(containerRef.current)
  
  return () => observer.disconnect() // Cleanup
}, [])
```

## TypeScript Types

```typescript
export interface DeviceFrameProps {
  url: string
  width: number
  height: number
  scale?: number
  label?: string
  rotating?: boolean
}
```

## Testing

Run tests with Vitest:

```bash
npm test DeviceFrame.test.tsx
```

Tests cover:
- ✅ Iframe rendering
- ✅ URL loading
- ✅ Dimensions display
- ✅ Label display
- ✅ Rotate button
- ✅ Sandbox attributes
- ✅ Loading state

## Demo

View live demo at `src/demo.tsx`:

```bash
npm run dev
# Navigate to demo page in extension
```

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Edge 90+
- ✅ Firefox 89+
- ✅ Safari 15+

Requires:
- ResizeObserver API
- CSS Transforms
- Iframe sandbox attribute

## Performance

- Smooth 60fps scaling with CSS transforms
- No layout thrashing
- Efficient ResizeObserver usage
- Debounced scale calculations

## Accessibility

- `aria-label` on rotate button
- `title` attribute on iframe
- Keyboard accessible controls
- Screen reader friendly states

## Future Enhancements

- [ ] Custom zoom controls
- [ ] Screenshot capture button
- [ ] Network throttling
- [ ] User agent override
- [ ] Touch event simulation
- [ ] Geolocation mocking
- [ ] Offline mode toggle

## License

MIT
