import type { BlogPost } from "./types";

export const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with React",
    content: `# Getting Started with React

React is a popular JavaScript library for building user interfaces. This guide will walk you through the basics.

## What is React?

React is a **declarative**, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components."

## Installation

To get started, you can create a new React app using Create React App:

\`\`\`bash
npx create-react-app my-app
cd my-app
npm start
\`\`\`

## Basic Example

Here's a simple React component:

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}
\`\`\`

> **Note:** Always start component names with a capital letter.

For more information, check out the [official React documentation](https://react.dev).`,
    excerpt:
      "Learn the basics of React development with this comprehensive guide",
    slug: "getting-started-with-react",
    author: {
      name: "John Doe",
      avatar: "https://picsum.photos/40",
    },
    publishedAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z",
    tags: ["react", "javascript", "frontend"],
    featured: true,
    coverImage: "https://picsum.photos/800/400",
  },
  {
    id: "2",
    title: "Advanced TypeScript Tips",
    content: `# Advanced TypeScript Tips

Take your TypeScript skills to the next level with these advanced techniques.

## Utility Types

TypeScript provides several utility types that can help you manipulate types:

- \`Partial<T>\` - Makes all properties optional
- \`Required<T>\` - Makes all properties required
- \`Pick<T, K>\` - Picks specific properties
- \`Omit<T, K>\` - Omits specific properties

## Advanced Generics

\`\`\`typescript
function createApiClient<T extends ApiConfig>(
  config: T
): ApiClient<T> {
  return new ApiClient(config);
}
\`\`\`

## Conditional Types

\`\`\`typescript
type IsString<T> = T extends string ? true : false;
\`\`\`

These patterns will help you write more maintainable and type-safe code.`,
    excerpt: "Master advanced TypeScript concepts and patterns",
    slug: "advanced-typescript-tips",
    author: {
      name: "Jane Smith",
      avatar: "https://picsum.photos/40",
    },
    publishedAt: "2024-02-01T10:00:00Z",
    tags: ["typescript", "javascript", "programming"],
    featured: false,
    coverImage: "https://picsum.photos/800/400",
  },
  {
    id: "3",
    title: "Building Scalable Web Apps",
    content: `# Building Scalable Web Applications

Learn the principles and practices for building applications that can grow with your needs.

## Architecture Principles

When building scalable web applications, consider these key principles:

1. **Separation of Concerns** - Keep different aspects of your app separate
2. **Modularity** - Build reusable, independent modules
3. **Performance** - Optimize for speed and efficiency

## Key Technologies

- **Frontend:** React, Vue, or Angular
- **Backend:** Node.js, Python, or Go
- **Database:** PostgreSQL, MongoDB, or Redis
- **Infrastructure:** AWS, Vercel, or Netlify

## Best Practices

- Use proper state management
- Implement proper error handling
- Write comprehensive tests
- Monitor performance metrics

Following these guidelines will help you build applications that can scale effectively.`,
    excerpt: "Best practices for scalable web development and architecture",
    slug: "building-scalable-web-apps",
    author: {
      name: "Bob Johnson",
    },
    publishedAt: "2024-02-15T10:00:00Z",
    tags: ["web-development", "scalability", "architecture"],
    featured: true,
  },
];
