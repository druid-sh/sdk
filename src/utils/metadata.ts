import { Metadata } from "next";
import { BlogPost } from "../types";

export function generateBlogPostMetadata(
  post: BlogPost,
  title: string
): Metadata {
  return {
    title: title,
    description: post.excerpt,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: post.excerpt,
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
