import React from "react";
import { BlogPost } from "../types";

interface BlogPostProps {
  post: BlogPost;
  showFullContent?: boolean;
}

export function BlogPost({ post, showFullContent = false }: BlogPostProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article
      className="blog-post"
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="blog-post-cover"
          style={{
            width: "100%",
            height: "400px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "2rem",
          }}
        />
      )}

      <header
        className="blog-post-header"
        style={{
          marginBottom: "2rem",
        }}
      >
        <h1
          className="blog-post-title"
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            color: "#1a1a1a",
          }}
        >
          {post.title}
        </h1>
        <div
          className="blog-post-meta"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1rem",
            color: "#666",
          }}
        >
          <div
            className="blog-post-author"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            {post.author.avatar && (
              <img
                src={post.author.avatar}
                alt={post.author.name}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                }}
              />
            )}
            <span>{post.author.name}</span>
          </div>
          <time dateTime={post.publishedAt}>{formattedDate}</time>
        </div>
        <div
          className="blog-post-tags"
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
          }}
        >
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="blog-post-tag"
              style={{
                background: "#f0f0f0",
                padding: "0.25rem 0.5rem",
                borderRadius: "4px",
                fontSize: "0.875rem",
                color: "#666",
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      <div
        className="blog-post-content"
        style={{
          lineHeight: "1.7",
          color: "#333",
        }}
      >
        {showFullContent ? (
          <div
            dangerouslySetInnerHTML={{
              __html: post.content.replace(/\n/g, "<br>"),
            }}
          />
        ) : (
          <p>{post.excerpt}</p>
        )}
      </div>

      <style jsx>{`
        .blog-post-content h1,
        .blog-post-content h2,
        .blog-post-content h3 {
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .blog-post-content pre {
          background: #f5f5f5;
          padding: 1rem;
          border-radius: 4px;
          overflow-x: auto;
        }
      `}</style>
    </article>
  );
}
