# ViewLens Chrome Extension

A powerful Chrome Extension built with Plasmo Framework, React, and TypeScript for advanced screenshot management and annotation.

## Features

- 📸 Screenshot capture with Chrome API
- ✏️ Annotation tools using Konva.js
- 💾 Local storage with IndexedDB and Chrome Storage API
- 🎨 Beautiful UI with Tailwind CSS and shadcn/ui
- 📄 PDF export with jsPDF
- 🔄 State management with Zustand
- 🧪 Testing with Playwright and Vitest

## Tech Stack

- **Framework**: Plasmo
- **UI**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: Zustand
- **Canvas**: Konva.js + react-konva
- **Storage**: IndexedDB + Chrome Storage API
- **Export**: jsPDF
- **Testing**: Playwright + Vitest
- **Code Quality**: ESLint + Prettier + Husky

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Load extension in Chrome:
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `build/chrome-mv3-dev` folder

## Folder Structure

```
src/
├── background/      # Background service worker
├── contents/        # Content scripts with Shadow DOM
├── popup/           # Extension popup UI
├── panel/           # Side panel UI
├── components/      # React components
│   └── ui/         # shadcn/ui components
├── store/          # Zustand state management
├── hooks/          # Custom React hooks
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests with Vitest
- `npm run lint` - Lint code
- `npm run lint:fix` - Fix linting issues
- `npm run format` - Format code with Prettier

## Permissions

The extension requires the following Chrome permissions:
- `tabs` - Access to browser tabs
- `activeTab` - Access to active tab
- `storage` - Chrome storage API
- `scripting` - Content script injection
- `downloads` - File downloads
- `sidePanel` - Side panel API

## License

MIT
