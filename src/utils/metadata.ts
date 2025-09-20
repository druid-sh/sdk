import { Metadata } from "next";
import { BlogPost } from "../types";

export function generateBlogPostMetadata(post: BlogPost): Metadata {
  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
    keywords: post.tags,
  };
}

export function generateBlogListMetadata(title = "Blog"): Metadata {
  return {
    title,
    description: "Read our latest blog posts and articles",
    openGraph: {
      title,
      description: "Read our latest blog posts and articles",
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description: "Read our latest blog posts and articles",
    },
  };
}
