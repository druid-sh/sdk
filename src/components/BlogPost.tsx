import React from "react";
import { BlogPost } from "../types";
import { processMarkdownContent } from "../utils/blog";

interface BlogPostProps {
  post: BlogPost;
  showFullContent?: boolean;
}

interface BlogPostContentProps {
  post: BlogPost;
  showFullContent?: boolean;
  processedContent?: string;
}

export async function BlogPost({
  post,
  showFullContent = true,
}: BlogPostProps) {
  let processedContent: string | undefined;

  if (showFullContent) {
    processedContent = await processMarkdownContent(post.content);
  }

  return (
    <BlogPostContent
      post={post}
      showFullContent={showFullContent}
      processedContent={processedContent}
    />
  );
}

function BlogPostContent({
  post,
  showFullContent = true,
  processedContent,
}: BlogPostContentProps) {
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
        {showFullContent && processedContent ? (
          <div
            dangerouslySetInnerHTML={{
              __html: processedContent,
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

        .blog-post-content code {
          background: #f0f0f0;
          padding: 0.125rem 0.25rem;
          border-radius: 3px;
          font-family: "Monaco", "Consolas", monospace;
        }

        .blog-post-content blockquote {
          border-left: 4px solid #e0e0e0;
          padding-left: 1rem;
          margin: 1rem 0;
          color: #666;
          font-style: italic;
        }

        .blog-post-content ul,
        .blog-post-content ol {
          padding-left: 2rem;
        }

        .blog-post-content li {
          margin-bottom: 0.5rem;
        }

        .blog-post-content a {
          color: #0066cc;
          text-decoration: none;
        }

        .blog-post-content a:hover {
          text-decoration: underline;
        }
      `}</style>
    </article>
  );
}
