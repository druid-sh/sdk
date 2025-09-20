import type { BlogPost, Category } from "../types";
import { mockBlogPosts, mockCategories } from "../data";

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

export async function getAllCategories(): Promise<Category[]> {
  // In a real app, this would fetch from a database or CMS
  // For now, return mock categories
  return mockCategories;
}

export async function getBlogPostsByCategory(
  categorySlug: string
): Promise<BlogPost[]> {
  // In a real app, this would filter from a database or CMS
  // For now, filter mock data
  const posts = await getAllBlogPosts();
  return posts.filter((post) => post.category === categorySlug);
}
