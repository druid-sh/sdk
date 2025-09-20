import React from "react";
import Link from "next/link";
import { BlogPostResponse } from "../types";
import { processMarkdownContent } from "../utils/remark";

interface BlogPostProps {
  postData: BlogPostResponse;
}

export async function BlogPost({ postData }: BlogPostProps) {
  const { post, basePath } = postData;

  if (!post) {
    return <div>Post not found</div>;
  }

  const processedContent = await processMarkdownContent(post.content);

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
        position: "relative",
      }}
    >
      <Link
        href={basePath}
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          textDecoration: "none",
          color: "#333",
          fontSize: "1rem",
          fontWeight: "500",
          background: "#fff",
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          border: "1px solid #e0e0e0",
          transition: "background 0.2s ease",
        }}
      >
        ← Back to Blog
      </Link>

      <header
        className="blog-post-header"
        style={{
          marginBottom: "2rem",
          marginTop: "3rem",
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
            <Link
              key={tag.slug}
              href={`${basePath}/tag/${tag.slug}`}
              style={{
                background: "#f0f0f0",
                padding: "0.25rem 0.5rem",
                borderRadius: "4px",
                fontSize: "0.875rem",
                color: "#666",
                textDecoration: "none",
                transition: "background 0.2s ease",
              }}
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      </header>

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

      <div
        className="blog-post-content"
        style={{
          lineHeight: "1.7",
          color: "#333",
        }}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: processedContent,
          }}
        />
      </div>

      <style jsx>{`
        .blog-post-content h1 {
          font-size: 2.25rem;
          font-weight: 700;
          margin-top: 2.5rem;
          margin-bottom: 1.5rem;
          color: #1a1a1a;
          line-height: 1.2;
        }

        .blog-post-content h2 {
          font-size: 1.875rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #1a1a1a;
          line-height: 1.3;
        }

        .blog-post-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #1a1a1a;
          line-height: 1.4;
        }

        .blog-post-content h4 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
          color: #333;
          line-height: 1.4;
        }

        .blog-post-content h5 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          color: #333;
          line-height: 1.4;
        }

        .blog-post-content h6 {
          font-size: 1rem;
          font-weight: 600;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
          color: #666;
          line-height: 1.4;
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

        .blog-post-content img {
          border-radius: 8px;
          max-width: 100%;
          height: auto;
          margin: 1rem 0;
        }
      `}</style>
    </article>
  );
}
