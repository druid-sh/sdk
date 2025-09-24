import Link from "next/link";
import Image from "next/image"; // Import the Next.js Image component
import React from "react";
import { BlogListResponse } from "../types";
interface BlogListProps {
  data: BlogListResponse;
}

export function BlogList({ data }: BlogListProps) {
  const { posts, allTags, basePath, currentTag } = data;
  const { page, total } = data.pagination; // 'limit' is not used directly in JSX, so remove

  // Use allTags if provided, otherwise extract unique tags from current posts
  const tagsToDisplay =
    allTags ||
    Array.from(
      new Map(
        posts.flatMap((post) => post.tags).map((tag) => [tag.slug, tag])
      ).values()
    );

  return (
    <div className="grid gap-8 max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      {" "}
      {/* Converted .blog-list */}
      {/* Tags Section */}
      <div className="flex flex-wrap gap-2 mb-8 p-4 bg-muted rounded-lg items-center">
        {" "}
        {/* Converted .blog-tags */}
        <span className="font-bold mr-4 text-foreground">Tags</span>{" "}
        {/* Converted .blog-tags > span */}
        <Link
          href={`${basePath}`}
          className={`px-2 py-1 rounded-md text-sm transition-colors
            ${
              !currentTag
                ? "bg-primary text-primary-foreground font-semibold"
                : "bg-muted-foreground/10 text-muted-foreground hover:bg-muted-foreground/20"
            }`} // Converted .tag-link & .tag-link.active
        >
          All
        </Link>
        {tagsToDisplay.map((tag) => {
          const isActive = currentTag === tag.slug;
          return (
            <Link
              key={tag.slug}
              href={`${basePath}/tag/${tag.slug}`}
              className={`px-2 py-1 rounded-md text-sm transition-colors
                ${
                  isActive
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "bg-muted-foreground/10 text-muted-foreground hover:bg-muted-foreground/20"
                }`} // Converted .tag-link & .tag-link.active
            >
              #{tag.name}
            </Link>
          );
        })}
      </div>
      {/* Posts List */}
      {posts.length === 0 ? (
        <div className="text-center py-12 px-8 text-lg text-muted-foreground bg-muted rounded-lg">
          {" "}
          {/* Converted .no-posts-found */}
          No posts found.
        </div>
      ) : (
        posts.map((post) => (
          <article
            key={post.id}
            className="group grid grid-cols-1 md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr] gap-6 p-6 border border-border rounded-lg" // Converted .blog-list-item and added group for image hover
          >
            {post.coverImage && (
              <div className="overflow-hidden rounded-md">
                {" "}
                {/* Converted .blog-list-image-wrapper */}
                <Link href={`${basePath}/${post.slug}`} className="block">
                  {" "}
                  {/* Added block to Link for full area hover */}
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    width={600} // Base width for 2:1 ratio
                    height={300} // Base height for 2:1 ratio
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="w-full h-auto object-cover rounded-md transition-transform duration-300 ease-in-out" // Converted inline styles and added group-hover for scale
                  />
                </Link>
              </div>
            )}

            <div className="flex flex-col">
              {" "}
              {/* Converted .blog-list-content */}
              <h2 className="text-2xl font-bold mb-2 leading-tight">
                {" "}
                {/* Converted .blog-list-title, increased size slightly */}
                <Link
                  href={`${basePath}/${post.slug}`}
                  className="text-foreground no-underline transition-colors hover:text-primary"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4 flex-grow">
                {" "}
                {/* Converted .blog-list-excerpt */}
                {post.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-2 text-sm text-muted-foreground">
                {" "}
                {/* Converted .blog-list-meta */}
                <div className="flex items-center gap-2">
                  {" "}
                  {/* Converted .blog-list-author */}
                  {post.author.avatar && (
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      width={24}
                      height={24}
                      className="rounded-full object-cover" // Converted inline style
                    />
                  )}
                  <span className="font-medium text-foreground">
                    {post.author.name}
                  </span>{" "}
                  {/* Added font-medium text-foreground for consistency */}
                </div>
                <span>•</span>
                <span className="text-sm text-muted-foreground">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    // More explicit date formatting
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {" "}
                {/* Converted .blog-list-post-tags and added mt-4 for separation */}
                {post.tags.slice(0, 3).map((tag) => (
                  <Link
                    key={tag.slug}
                    href={`${basePath}/tag/${tag.slug}`}
                    className="inline-block bg-secondary px-2 py-1 rounded-md text-xs font-semibold text-secondary-foreground no-underline transition-colors hover:bg-secondary/80" // Converted styles
                  >
                    #{tag.name}
                  </Link>
                ))}
              </div>
            </div>
          </article>
        ))
      )}
      {/* Pagination */}
      <div className="flex justify-center items-center gap-8 mt-8 p-4 flex-wrap sm:flex-nowrap flex-col sm:flex-row">
        {" "}
        {/* Converted .blog-pagination and made responsive */}
        {page > 1 && (
          <Link
            href={
              currentTag
                ? `${basePath}/tag/${currentTag}?page=${page - 1}`
                : `${basePath}?page=${page - 1}`
            }
            className="px-6 py-3 bg-background border-2 border-border rounded-lg text-foreground font-medium transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground no-underline text-center" // Converted .blog-pagination-link
          >
            ← Previous
          </Link>
        )}
        <div className="px-4 py-3 bg-muted rounded-lg text-muted-foreground font-medium">
          {" "}
          {/* Converted .blog-pagination-info */}
          Page {page} of {total}
        </div>
        {page < total && (
          <Link
            href={
              currentTag
                ? `${basePath}/tag/${currentTag}?page=${page + 1}`
                : `${basePath}?page=${page + 1}`
            }
            className="px-6 py-3 bg-background border-2 border-border rounded-lg text-foreground font-medium transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground no-underline text-center" // Converted .blog-pagination-link
          >
            Next →
          </Link>
        )}
      </div>
    </div>
  );
}
