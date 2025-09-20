import React from "react";
import Link from "next/link";
import { BlogPost as BlogPostType, BlogListResponse } from "../types";

interface BlogListProps {
  blogData: BlogListResponse;
  basePath?: string;
  baseUrl?: string;
}

export function BlogList({
  blogData,
  basePath = "/blog",
  baseUrl,
}: BlogListProps) {
  const { posts, page, total, limit } = blogData;
  const totalPages = Math.ceil(total / limit);

  // Extract unique tags from all posts
  const uniqueTags = Array.from(
    new Set(
      posts
        .map((post: BlogPostType) => post.tags)
        .reduce((acc, tags) => acc.concat(tags), [])
    )
  );

  return (
    <div
      className="blog-list"
      style={{
        display: "grid",
        gap: "2rem",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      {/* Tags Section */}
      {uniqueTags.length > 0 && (
        <div
          className="blog-tags"
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            marginBottom: "2rem",
            padding: "1rem",
            background: "#f8f9fa",
            borderRadius: "8px",
          }}
        >
          <span style={{ fontWeight: "bold", marginRight: "1rem" }}>
            Filter by tag:
          </span>
          {uniqueTags.map((tag) => (
            <Link
              key={tag}
              href={`${basePath}/tag/${tag}`}
              style={{
                background: "#e0e0e0",
                padding: "0.25rem 0.5rem",
                borderRadius: "4px",
                textDecoration: "none",
                color: "#333",
                fontSize: "0.875rem",
                transition: "background 0.2s ease",
              }}
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}

      {/* Posts List */}
      {posts.map((post) => (
        <article
          key={post.id}
          className="blog-list-item"
          style={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            gap: "1.5rem",
            padding: "1.5rem",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
          }}
        >
          {post.coverImage && (
            <Link href={`${basePath}/${post.slug}`}>
              <img
                src={post.coverImage}
                alt={post.title}
                className="blog-list-image"
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />
            </Link>
          )}

          <div className="blog-list-content">
            <h2
              className="blog-list-title"
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              <Link
                href={`${basePath}/${post.slug}`}
                style={{
                  color: "#1a1a1a",
                  textDecoration: "none",
                }}
              >
                {post.title}
              </Link>
            </h2>
            <p
              className="blog-list-excerpt"
              style={{
                color: "#666",
                lineHeight: "1.6",
                marginBottom: "1rem",
              }}
            >
              {post.excerpt}
            </p>

            <div
              className="blog-list-meta"
              style={{
                display: "flex",
                gap: "1rem",
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
                color: "#888",
              }}
            >
              <span className="blog-list-author">{post.author.name}</span>
              <span className="blog-list-date">
                {new Date(post.publishedAt).toLocaleDateString()}
              </span>
            </div>

            <div
              className="blog-list-tags"
              style={{
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="blog-list-tag"
                  style={{
                    background: "#f0f0f0",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "4px",
                    fontSize: "0.75rem",
                    color: "#666",
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      ))}

      {/* Always Visible Pagination */}
      <div
        className="blog-pagination"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
          marginTop: "3rem",
          padding: "2rem",
        }}
      >
        {page > 1 && (
          <Link
            href={`${baseUrl || basePath}?page=${page - 1}`}
            className="blog-pagination-link"
            style={{
              padding: "0.75rem 1.5rem",
              background: "#fff",
              border: "2px solid #e0e0e0",
              borderRadius: "8px",
              textDecoration: "none",
              color: "#333",
              fontWeight: "500",
              transition: "all 0.2s ease",
            }}
          >
            ← Previous
          </Link>
        )}

        <div
          className="blog-pagination-info"
          style={{
            padding: "0.75rem 1rem",
            background: "#f8f9fa",
            borderRadius: "8px",
            color: "#666",
            fontWeight: "500",
          }}
        >
          Page {page} of {totalPages}
        </div>

        {page < totalPages && (
          <Link
            href={`${baseUrl || basePath}?page=${page + 1}`}
            className="blog-pagination-link"
            style={{
              padding: "0.75rem 1.5rem",
              background: "#fff",
              border: "2px solid #e0e0e0",
              borderRadius: "8px",
              textDecoration: "none",
              color: "#333",
              fontWeight: "500",
              transition: "all 0.2s ease",
            }}
          >
            Next →
          </Link>
        )}
      </div>
    </div>
  );
}
