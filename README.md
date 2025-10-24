# Frontend Builder

A powerful React/Next.js SaaS website and app builder with drag-and-drop UI, code export, multi-page support, AI model integration, API generator, domain management, and analytics.

## Features

- 🎨 **Drag-and-Drop Builder** - Visual interface to build websites with ease
- 📝 **Code Editor** - Export your projects as React or HTML code
- 🤖 **AI Integration** - Generate components and layouts using AI
- 📄 **Multi-Page Support** - Create and manage multiple pages
- 🔌 **API Generator** - Create and manage API endpoints
- 🌐 **Domain Management** - Manage domains and DNS settings
- 📊 **Analytics Dashboard** - Track user behavior and site performance
- 🏪 **Marketplace** - Browse and use community components
- 📚 **Templates** - Start with pre-built templates

## Tech Stack

- **React 19** - UI library with functional components and hooks
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS framework
- **ESLint** - Code linting and formatting

## Project Structure

```
src/
├── app/              # Next.js app router pages
│   ├── builder/      # Drag-and-drop builder interface
│   ├── editor/       # Code editor and export
│   ├── ai/           # AI assistant for generation
│   ├── templates/    # Template library
│   ├── marketplace/  # Component marketplace
│   ├── analytics/    # Analytics dashboard
│   └── preview/      # Preview mode
├── contexts/         # React contexts for state management
│   ├── AppContext.tsx      # Application state
│   ├── BuilderContext.tsx  # Builder state and operations
│   └── UserContext.tsx     # User authentication state
├── hooks/            # Custom React hooks
│   ├── useDragAndDrop.ts   # Drag-and-drop functionality
│   ├── useCodeExport.ts    # Code export utilities
│   └── useAPI.ts           # API management
├── services/         # Business logic and API integrations
│   ├── aiService.ts        # AI model integration
│   ├── analyticsService.ts # Analytics tracking
│   └── domainService.ts    # Domain management
├── components/       # Reusable React components
├── styles/           # Global styles
└── types/            # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/AI-WONDER-LABs/frontend-builder.git
cd frontend-builder
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Usage

### Builder

Navigate to `/builder` to access the drag-and-drop interface. Drag components from the left panel onto the canvas to build your website.

### Code Editor

Visit `/editor` to export your project as React or HTML code. You can download the generated code for use in your own projects.

### AI Assistant

Go to `/ai` to use the AI assistant. Describe what you want to build, and the AI will generate component code for you.

### Templates

Browse pre-built templates at `/templates`. Select a template to start building faster.

### Marketplace

Visit `/marketplace` to find community-created components, plugins, and assets.

### Analytics

View your site's analytics and performance metrics at `/analytics`.

## Development

### Coding Style

- ES6+ syntax
- Functional components with React hooks
- Arrow functions preferred
- TypeScript for type safety
- Composition and reusable logic
- async/await for asynchronous code

### State Management

The app uses React Context API for state management:

- **AppContext** - Global app settings (theme, sidebar state)
- **BuilderContext** - Builder state (pages, components, history)
- **UserContext** - User authentication and profile

### Custom Hooks

- `useDragAndDrop` - Drag-and-drop functionality
- `useCodeExport` - Export code in different formats
- `useAPI` - API endpoint management

### Services

- `aiService` - AI model integration and component generation
- `analyticsService` - Event tracking and metrics
- `domainService` - Domain and DNS management

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
