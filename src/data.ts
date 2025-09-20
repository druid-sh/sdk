import type { BlogPost } from "./types";

export const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with React",
    content: "This is a comprehensive guide to getting started with React...",
    excerpt: "Learn the basics of React development",
    slug: "getting-started-with-react",
    author: {
      name: "John Doe",
      avatar: "/avatars/john.jpg",
    },
    publishedAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z",
    tags: ["react", "javascript", "frontend"],
    featured: true,
    coverImage: "/images/react-guide.jpg",
  },
  {
    id: "2",
    title: "Advanced TypeScript Tips",
    content: "Dive deep into advanced TypeScript features...",
    excerpt: "Master advanced TypeScript concepts",
    slug: "advanced-typescript-tips",
    author: {
      name: "Jane Smith",
      avatar: "/avatars/jane.jpg",
    },
    publishedAt: "2024-02-01T10:00:00Z",
    tags: ["typescript", "javascript", "programming"],
    featured: false,
    coverImage: "/images/typescript-tips.jpg",
  },
  {
    id: "3",
    title: "Building Scalable Web Apps",
    content: "Learn how to build scalable web applications...",
    excerpt: "Best practices for scalable web development",
    slug: "building-scalable-web-apps",
    author: {
      name: "Bob Johnson",
    },
    publishedAt: "2024-02-15T10:00:00Z",
    tags: ["web-development", "scalability", "architecture"],
    featured: true,
  },
];
