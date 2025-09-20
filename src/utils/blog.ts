import type { BlogPost, BlogListResponse } from "../types";
import { mockBlogPosts } from "../data";
import { remark } from "remark";
import remarkHtml from "remark-html";

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

export async function getBlogPostsByTagPaginated(
  tag: string,
  page: number = 1,
  limit: number = 10
): Promise<BlogListResponse> {
  // Get all posts with the specified tag
  const allTaggedPosts = await getBlogPostsByTag(tag);

  // Calculate pagination
  const total = allTaggedPosts.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const posts = allTaggedPosts.slice(startIndex, endIndex);

  // Get all available tags
  const allTags = await getAllTags();

  return {
    posts,
    total,
    page,
    limit,
    allTags,
  };
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

export async function processMarkdownContent(
  markdown: string
): Promise<string> {
  // Process markdown content to HTML
  const processedContent = await remark()
    .use(remarkHtml, { sanitize: true })
    .process(markdown);
  return processedContent.toString();
}
