import parse from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BlogPostResponse } from "../types";

interface BlogPostProps {
  data: BlogPostResponse;
}

export async function BlogPost({ data }: BlogPostProps) {
  const { post, basePath } = data;

  if (!post) {
    // You could render a dedicated "Not Found" component here
    return (
      <div className="flex h-screen items-center justify-center">
        Post not found
      </div>
    );
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    // Main container for the blog post
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* "Back to Blog" link, styled subtly like shadcn meta text */}
      <div className="mb-8">
        <Link
          href={basePath}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {/* Using an icon from lucide-react is a common shadcn pattern */}
          <span>← Back to Blog</span>
        </Link>
      </div>

      {/* Post header section */}
      <header className="mb-8 border-b pb-8">
        {/* Post title with responsive font sizes */}
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-foreground">
          {post.title}
        </h1>

        {/* Post metadata: author and date */}
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            {post.author.avatar && (
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={28}
                height={28}
                // Converted inline style to Tailwind class
                className="rounded-full"
              />
            )}
            <span className="font-medium text-foreground">
              {post.author.name}
            </span>
          </div>
          <span>•</span>
          <time dateTime={post.publishedAt}>{formattedDate}</time>
        </div>

        {/* Post tags, styled to look like shadcn Badges */}
        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag.slug}
              href={`${basePath}/tag/${tag.slug}`}
              className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      </header>

      {/* Cover image, if it exists */}
      {post.coverImage && (
        <div className="my-8">
          <Image
            src={post.coverImage}
            alt={post.title}
            width={1200}
            height={600}
            sizes="(max-width: 800px) 100vw, 800px"
            // Converted inline styles to Tailwind classes
            className="w-full h-auto object-cover rounded-lg border"
            priority // Preload the LCP image
          />
        </div>
      )}

      {/* 
        This is where the markdown content is rendered.
        The `prose` classes from @tailwindcss/typography handle all the styling
        for h1, p, pre, code, blockquote, etc. generated from markdown.
        - `prose`: Base typography styles.
        - `prose-lg`: Larger font size for better readability.
        - `dark:prose-invert`: Adapts colors for dark mode.
        - `max-w-none`: Removes the max-width constraint from the prose class itself,
          allowing the parent container (`max-w-3xl`) to control the width.
        - `prose-headings:*`, `prose-a:*`, etc. are modifiers to customize specific elements.
      */}
      <div
        className="prose prose-lg dark:prose-invert max-w-none 
                   prose-headings:font-bold prose-headings:tracking-tight 
                   prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                   prose-blockquote:border-l-primary
                   prose-img:rounded-lg prose-img:border"
      >
        {parse(post.content, {
          replace: (domNode: any) => {
            if (domNode.name === "img") {
              const { src, alt, width, height } = domNode.attribs;

              return (
                <Image
                  src={src}
                  alt={alt || ""}
                  width={width ? parseInt(width) : 800}
                  height={height ? parseInt(height) : 600}
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="w-full h-auto object-cover rounded-lg border"
                />
              );
            }
          },
        })}
      </div>
    </article>
  );
}
