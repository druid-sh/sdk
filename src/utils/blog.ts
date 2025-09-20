import type { BlogPost } from "../types";
import { mockBlogPosts } from "../data";

// Utility functions for blog data (server-side compatible)

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  // In a real app, this would fetch from a database or CMS
  // For now, return mock data
  return mockBlogPosts;
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  // In a real app, this would fetch from a database or CMS
  // For now, find in mock data
  const posts = await getAllBlogPosts();
  return posts.find((post) => post.slug === slug) || null;
}

export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  // In a real app, this would filter from a database or CMS
  // For now, filter mock data
  const posts = await getAllBlogPosts();
  return posts.filter((post) => post.tags.includes(tag));
}

export async function getAllTags(): Promise<string[]> {
  // Get all unique tags from blog posts
  const posts = await getAllBlogPosts();
  const tagsSet = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag));
  });
  return Array.from(tagsSet);
}
