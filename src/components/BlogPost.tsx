import React from "react";
import Link from "next/link";
import Image from "next/image"; // Already imported, now used for cover image
import { BlogPostResponse } from "../types";

interface BlogPostProps {
  data: BlogPostResponse;
}

export async function BlogPost({ data }: BlogPostProps) {
  const { post, basePath } = data;

  if (!post) {
    return <div>Post not found</div>;
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <article className="blog-post">
        <Link href={basePath} className="back-link">
          ← Back to Blog
        </Link>

        <header className="blog-post-header">
          <h1 className="blog-post-title">{post.title}</h1>
          <div className="blog-post-meta">
            <div className="blog-post-author">
              {post.author.avatar && (
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={32}
                  height={32}
                  style={{ borderRadius: "50%" }}
                />
              )}
              <span>{post.author.name}</span>
            </div>
            <time dateTime={post.publishedAt}>{formattedDate}</time>
          </div>
          <div className="blog-post-tags">
            {post.tags.map((tag) => (
              <Link key={tag.slug} href={`${basePath}/tag/${tag.slug}`}>
                #{tag.name}
              </Link>
            ))}
          </div>
        </header>

        {post.coverImage && (
          <div className="blog-post-cover">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={1200} // Enforces 2:1 aspect ratio
              height={600} // Enforces 2:1 aspect ratio
              sizes="(max-width: 800px) 100vw, 800px"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                borderRadius: "8px",
              }}
              priority // Preload the LCP image
            />
          </div>
        )}

        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{
            __html: post.content,
          }}
        />
      </article>

      {/* --- Scoped Component and Markdown Styles --- */}
      <style jsx global>{`
        /* Styles for HTML generated from Markdown */
        .blog-post-content h1,
        .blog-post-content h2,
        .blog-post-content h3,
        .blog-post-content h4,
        .blog-post-content h5,
        .blog-post-content h6 {
          color: #1a1a1a;
          line-height: 1.3;
        }
        .blog-post-content h1 {
          font-size: 2.25rem;
          font-weight: 700;
          margin-top: 2.5rem;
          margin-bottom: 1.5rem;
        }
        .blog-post-content h2 {
          font-size: 1.875rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .blog-post-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .blog-post-content p {
          margin-bottom: 1rem;
        }
        .blog-post-content pre {
          background: #f5f5f5;
          padding: 1rem;
          border-radius: 4px;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        .blog-post-content code {
          background: #f0f0f0;
          padding: 0.125rem 0.25rem;
          border-radius: 3px;
          font-family: "Menlo", "Consolas", monospace;
        }
        .blog-post-content blockquote {
          border-left: 4px solid #e0e0e0;
          padding-left: 1rem;
          margin: 1.5rem 0;
          color: #666;
          font-style: italic;
        }
        .blog-post-content ul,
        .blog-post-content ol {
          padding-left: 2rem;
          margin: 1.5rem 0;
        }
        .blog-post-content li {
          margin-bottom: 0.5rem;
        }
        .blog-post-content a {
          color: #007bff;
          text-decoration: none;
          border-bottom: 1px solid #007bff30;
          transition: border-color 0.2s ease;
        }
        .blog-post-content a:hover {
          border-color: #007bff;
        }
        .blog-post-content img {
          border-radius: 8px;
          max-width: 100%;
          height: auto;
          margin: 2rem 0;
        }
      `}</style>
      <style jsx>{`
        .blog-post {
          max-width: 800px;
          margin: 0 auto;
          padding: 4rem 2rem 2rem;
          position: relative;
        }
        .back-link {
          position: absolute;
          top: 1rem;
          left: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          color: #333;
          font-size: 1rem;
          font-weight: 500;
          background: #fff;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          border: 1px solid #e0e0e0;
          transition: background 0.2s ease, box-shadow 0.2s ease;
        }
        .back-link:hover {
          background: #f8f9fa;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }
        .blog-post-header {
          margin-bottom: 2rem;
        }
        .blog-post-title {
          font-size: 2.75rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #1a1a1a;
          line-height: 1.2;
        }
        .blog-post-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 1rem;
          color: #666;
        }
        .blog-post-author {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .blog-post-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .blog-post-tags a {
          background: #f0f0f0;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.875rem;
          color: #666;
          text-decoration: none;
          transition: background 0.2s ease;
        }
        .blog-post-tags a:hover {
          background: #e0e0e0;
        }
        .blog-post-cover {
          margin-bottom: 2rem;
        }
        .blog-post-content {
          line-height: 1.7;
          color: #333;
          font-size: 1.125rem;
        }

        /* --- Responsive Styles --- */
        @media (max-width: 768px) {
          .blog-post {
            padding: 4rem 1rem 1rem;
          }
          .blog-post-title {
            font-size: 2rem;
          }
          .blog-post-content {
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
}
