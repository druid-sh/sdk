import { Metadata } from "next";
import { BlogPost } from "../types";

/**
 * Generates an SEO-friendly excerpt from content
 */
export function generateExcerpt(
  content: string,
  maxLength: number = 160
): string {
  // Remove markdown syntax for cleaner excerpt
  const cleanContent = content
    .replace(/#{1,6}\s+/g, "") // Remove headers
    .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold
    .replace(/\*(.*?)\*/g, "$1") // Remove italic
    .replace(/`(.*?)`/g, "$1") // Remove inline code
    .replace(/\[(.*?)\]\(.*?\)/g, "$1") // Remove links, keep text
    .replace(/!\[.*?\]\(.*?\)/g, "") // Remove images
    .replace(/\n+/g, " ") // Replace newlines with spaces
    .trim();

  if (cleanContent.length <= maxLength) {
    return cleanContent;
  }

  // Find the last complete sentence within the limit
  const truncated = cleanContent.substring(0, maxLength);
  const lastSentenceEnd = Math.max(
    truncated.lastIndexOf("."),
    truncated.lastIndexOf("!"),
    truncated.lastIndexOf("?")
  );

  if (lastSentenceEnd > maxLength * 0.7) {
    return truncated.substring(0, lastSentenceEnd + 1);
  }

  // If no good sentence break, find last space
  const lastSpace = truncated.lastIndexOf(" ");
  return lastSpace > 0
    ? truncated.substring(0, lastSpace) + "..."
    : truncated + "...";
}

export function generateBlogPostMetadata(
  post: BlogPost,
  title: string
): Metadata {
  return {
    title: title,
    description: generateExcerpt(post.content),
    authors: [{ name: post.author.name }],
    openGraph: {
      title: title,
      description: generateExcerpt(post.content),
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: generateExcerpt(post.content),
      images: post.coverImage ? [post.coverImage] : undefined,
    },
    keywords: post.tags.map((tag) => tag.name),
  };
}

export function generateBlogListMetadata(title: string): Metadata {
  return {
    title: title,
    description: "Read our latest blog posts and articles",
    openGraph: {
      title: title,
      description: "Read our latest blog posts and articles",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: title,
      description: "Read our latest blog posts and articles",
    },
  };
}
