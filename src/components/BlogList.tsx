import React from "react";
import Link from "next/link";
import { BlogPost as BlogPostType, BlogListResponse } from "../types";

interface BlogListProps {
  blogData: BlogListResponse;
}

export function BlogList({ blogData }: BlogListProps) {
  const { posts, page, total, limit, allTags, basePath, currentTag } = blogData;
  const totalPages = Math.ceil(total / limit);

  // Use allTags if provided, otherwise extract unique tags from current posts
  const tagsToDisplay =
    allTags ||
    Array.from(
      new Map(
        posts.flatMap((post) => post.tags).map((tag) => [tag.slug, tag])
      ).values()
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
      {/* Tags Section - Always Visible */}
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
        <span style={{ fontWeight: "bold", marginRight: "1rem" }}>Tags</span>
        <Link
          href={`${basePath}`}
          style={{
            background: !currentTag ? "#007bff" : "#e0e0e0",
            color: !currentTag ? "#fff" : "#333",
            padding: "0.25rem 0.5rem",
            borderRadius: "4px",
            textDecoration: "none",
            fontSize: "0.875rem",
            transition: "background 0.2s ease",
            fontWeight: !currentTag ? "bold" : "normal",
          }}
        >
          All
        </Link>
        {tagsToDisplay.map((tag) => {
          const isActive = currentTag === tag.slug;
          return (
            <Link
              key={tag.slug}
              href={`${basePath}/tag/${tag.slug}`}
              style={{
                background: isActive ? "#007bff" : "#e0e0e0",
                color: isActive ? "#fff" : "#333",
                padding: "0.25rem 0.5rem",
                borderRadius: "4px",
                textDecoration: "none",
                fontSize: "0.875rem",
                transition: "background 0.2s ease",
                fontWeight: isActive ? "bold" : "normal",
              }}
            >
              #{tag.name}
            </Link>
          );
        })}
      </div>

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
              <div
                className="blog-list-author"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                  }}
                />
                <span>{post.author.name}</span>
              </div>
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
                <Link
                  key={tag.slug}
                  href={`${basePath}/tag/${tag.slug}`}
                  style={{
                    background: "#f0f0f0",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "4px",
                    fontSize: "0.75rem",
                    color: "#666",
                    textDecoration: "none",
                    transition: "background 0.2s ease",
                  }}
                >
                  #{tag.name}
                </Link>
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
            href={`${basePath}?page=${page - 1}`}
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
            href={`${basePath}?page=${page + 1}`}
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
