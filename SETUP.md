# ViewLens Setup Guide

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

This will:
- Start the Plasmo development server
- Create a `build/chrome-mv3-dev` directory
- Enable hot module reloading

### 3. Load Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right)
3. Click "Load unpacked"
4. Select the `build/chrome-mv3-dev` folder

### 4. Verify Installation

- Extension icon should appear in Chrome toolbar
- Click the icon to open the popup
- Test screenshot capture functionality

## Development

### File Structure
```
src/
├── background/      # Background service worker
│   └── index.ts
├── contents/        # Content scripts with Shadow DOM
│   └── index.tsx
├── popup/           # Extension popup UI
│   └── index.tsx
├── panel/           # Side panel UI
│   └── index.tsx
├── components/      # React components
│   ├── ui/         # shadcn/ui components
│   └── AnnotationCanvas.tsx
├── store/          # Zustand state management
│   └── index.ts
├── hooks/          # Custom React hooks
│   ├── useChromeStorage.ts
│   └── useIndexedDB.ts
├── types/          # TypeScript type definitions
│   └── index.ts
└── utils/          # Utility functions
    ├── cn.ts
    ├── indexedDB.ts
    ├── pdf.ts
    ├── screenshot.ts
    └── storage.ts
```

### Commands

- `npm run dev` - Development mode with hot reload
- `npm run build` - Production build
- `npm test` - Run Vitest tests
- `npm run lint` - Check code quality
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code with Prettier

### Configuration Files

- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `.eslintrc.js` - ESLint rules
- `.prettierrc` - Code formatting rules
- `vitest.config.ts` - Testing configuration
- `playwright.config.ts` - E2E testing configuration

## Features Configured

✅ Plasmo Framework with React + TypeScript
✅ Tailwind CSS with shadcn/ui theme
✅ Zustand for state management
✅ Konva.js for canvas annotations
✅ jsPDF for PDF export
✅ IndexedDB for local data storage
✅ Chrome Storage API utilities
✅ ESLint + Prettier + Husky
✅ Vitest + Playwright for testing
✅ Shadow DOM for content scripts

## Chrome Permissions

The extension uses:
- `tabs` - Access browser tabs
- `activeTab` - Access active tab
- `storage` - Chrome storage API
- `scripting` - Inject content scripts
- `downloads` - Download files
- `sidePanel` - Side panel UI

## Next Steps

1. Add extension icons to `assets/` directory
2. Implement annotation tools in AnnotationCanvas
3. Build screenshot management UI
4. Add PDF export functionality
5. Write tests for core features

## Troubleshooting

### Extension not loading
- Verify `build/chrome-mv3-dev` exists
- Check console for errors
- Reload extension from `chrome://extensions/`

### Hot reload not working
- Restart dev server
- Manually reload extension

### TypeScript errors
- Run `npm install` to ensure dependencies are installed
- Check `tsconfig.json` paths configuration
