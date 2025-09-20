import { BlogPost, BlogConfig, BlogListResponse } from "./types";

class BlogusClient {
  private config: BlogConfig | null = null;

  constructor(config?: BlogConfig) {
    if (config) {
      this.config = config;
    }
  }

  // Mock data for now - replace with real API calls later
  private getMockPosts(): BlogPost[] {
    return [
      {
        id: "1",
        title: "Getting Started with Next.js 14",
        content: `# Getting Started with Next.js 14

Next.js 14 brings exciting new features including improved App Router, better performance, and enhanced developer experience.

## Key Features

- **App Router**: The future of Next.js routing
- **Server Components**: Better performance by default
- **Streaming**: Improved loading states

## Installation

\`\`\`bash
npx create-next-app@latest my-app
\`\`\`

Start building amazing web applications today!`,
        excerpt:
          "Learn about the latest features in Next.js 14 and how to get started with the App Router.",
        slug: "getting-started-nextjs-14",
        author: { name: "John Doe", avatar: "https://picsum.photos/40" },
        publishedAt: "2024-01-15T10:00:00Z",
        tags: ["nextjs", "react", "tutorial"],
        featured: true,
        coverImage: "https://picsum.photos/800/400",
      },
      {
        id: "2",
        title: "Building Scalable React Applications",
        content: `# Building Scalable React Applications

Learn the best practices for building large-scale React applications that are maintainable and performant.

## Architecture Patterns

- Component composition
- State management strategies
- Performance optimization

## Tools and Libraries

Essential tools for scaling your React apps effectively.`,
        excerpt:
          "Best practices and patterns for building scalable React applications.",
        slug: "scalable-react-applications",
        author: { name: "Jane Smith" },
        publishedAt: "2024-01-10T14:30:00Z",
        tags: ["react", "architecture", "scalability"],
        featured: false,
      },
      {
        id: "3",
        title: "TypeScript Tips and Tricks",
        content: `# TypeScript Tips and Tricks

Advanced TypeScript patterns that will make you more productive.

## Utility Types

- Partial<T>
- Pick<T, K>
- Omit<T, K>

## Advanced Patterns

Learn about conditional types, mapped types, and more.`,
        excerpt:
          "Advanced TypeScript patterns and utility types for better development.",
        slug: "typescript-tips-tricks",
        author: { name: "Mike Johnson" },
        publishedAt: "2024-01-05T09:15:00Z",
        tags: ["typescript", "tips", "advanced"],
      },
    ];
  }

  async getPosts(page = 1, limit = 10): Promise<BlogListResponse> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    const allPosts = this.getMockPosts();
    const startIndex = (page - 1) * limit;
    const posts = allPosts.slice(startIndex, startIndex + limit);
    const allTags = this.getAllTags();

    return {
      posts,
      total: allPosts.length,
      page,
      limit,
      allTags,
    };
  }

  async getPost(slug: string): Promise<BlogPost | null> {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const posts = this.getMockPosts();
    return posts.find((post) => post.slug === slug) || null;
  }

  async getFeatured(): Promise<BlogPost[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const posts = this.getMockPosts();
    return posts.filter((post) => post.featured);
  }

  async getPostsByTag(
    tag: string,
    page = 1,
    limit = 10
  ): Promise<BlogListResponse> {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const allPosts = this.getMockPosts();
    const taggedPosts = allPosts.filter((post) => post.tags.includes(tag));
    const startIndex = (page - 1) * limit;
    const posts = taggedPosts.slice(startIndex, startIndex + limit);
    const allTags = this.getAllTags();

    return {
      posts,
      total: taggedPosts.length,
      page,
      limit,
      allTags,
    };
  }

  async getTags(): Promise<string[]> {
    await new Promise((resolve) => setTimeout(resolve, 100));

    const posts = this.getMockPosts();
    const allTags = posts.flatMap((post) => post.tags);
    const uniqueTags = Array.from(new Set(allTags));

    return uniqueTags;
  }

  private getAllTags(): string[] {
    const posts = this.getMockPosts();
    const allTags = posts.flatMap((post) => post.tags);
    const uniqueTags = Array.from(new Set(allTags));
    return uniqueTags;
  }
}

export { BlogusClient };
