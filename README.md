# Blogus React SDK

A minimal React SDK for displaying blog posts with TypeScript and Vite.

## Features

- **BlogProvider**: Simple React Context for blog state management
- **BlogList**: Component to display a list of blog posts
- **BlogPost**: Component to render individual blog posts with title and content
- **TypeScript Support**: Full TypeScript support with proper type definitions
- **CSS Modules**: Basic styling with CSS modules (no theming system)
- **Tree Shaking**: Optimized for tree shaking to minimize bundle size

## Installation

```bash
npm install blogus-sh-sdk
```

## Usage

```tsx
import { BlogProvider, BlogList } from "blogus-sh-sdk";

function App() {
  return (
    <BlogProvider>
      <div>
        <h1>My Blog</h1>
        <BlogList />
      </div>
    </BlogProvider>
  );
}
```

## Components

### BlogProvider

A React context provider that manages blog posts state.

```tsx
<BlogProvider>{/* Your app components */}</BlogProvider>
```

### BlogList

Displays a list of blog posts from the BlogProvider context.

```tsx
<BlogList />
```

### BlogPost

Renders an individual blog post with title and content.

```tsx
<BlogPost post={blogPost} />
```

## Types

```tsx
import type { BlogPostType, Category } from "blogus-sh-sdk";

interface BlogPostType {
  id: string;
  slug: string;
  title: string;
  content: string;
  publishedAt: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build the library
npm run build

# Run linting
npm run lint
```

## Building

The library is built using Vite and outputs both ES modules and UMD formats:

```bash
npm run build
```

This will generate:

- `dist/blogus-component-library.es.js` - ES module
- `dist/blogus-component-library.umd.js` - UMD module
- `dist/index.d.ts` - TypeScript declarations
