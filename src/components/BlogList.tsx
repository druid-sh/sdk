import Link from "next/link";
import Image from "next/image"; // Import the Next.js Image component
import React from "react";
import { BlogListResponse } from "../types";

interface BlogListProps {
  data: BlogListResponse;
}

export function BlogList({ data }: BlogListProps) {
  const { posts, allTags, basePath, currentTag } = data;
  const { page, limit, total } = data.pagination;

  // Use allTags if provided, otherwise extract unique tags from current posts
  const tagsToDisplay =
    allTags ||
    Array.from(
      new Map(
        posts.flatMap((post) => post.tags).map((tag) => [tag.slug, tag])
      ).values()
    );

  return (
    <>
      <div className="blog-list">
        {/* Tags Section */}
        <div className="blog-tags">
          <span>Tags</span>
          <Link
            href={`${basePath}`}
            className={`tag-link ${!currentTag ? "active" : ""}`}
          >
            All
          </Link>
          {tagsToDisplay.map((tag) => {
            const isActive = currentTag === tag.slug;
            return (
              <Link
                key={tag.slug}
                href={`${basePath}/tag/${tag.slug}`}
                className={`tag-link ${isActive ? "active" : ""}`}
              >
                #{tag.name}
              </Link>
            );
          })}
        </div>

        {/* Posts List */}
        {posts.length === 0 ? (
          <div className="no-posts-found">No posts found.</div>
        ) : (
          posts.map((post) => (
            <article key={post.id} className="blog-list-item">
              {post.coverImage && (
                <div className="blog-list-image-wrapper">
                  <Link href={`${basePath}/${post.slug}`}>
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      width={600} // Base width for 2:1 ratio
                      height={300} // Base height for 2:1 ratio
                      sizes="(max-width: 768px) 100vw, 300px"
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                    />
                  </Link>
                </div>
              )}

              <div className="blog-list-content">
                <h2 className="blog-list-title">
                  <Link href={`${basePath}/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="blog-list-excerpt">{post.excerpt}</p>

                <div className="blog-list-meta">
                  <div className="blog-list-author">
                    {post.author.avatar && (
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={24}
                        height={24}
                        style={{ borderRadius: "50%" }}
                      />
                    )}
                    <span>{post.author.name}</span>
                  </div>
                  <span className="blog-list-date">
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="blog-list-post-tags">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Link key={tag.slug} href={`${basePath}/tag/${tag.slug}`}>
                      #{tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ))
        )}

        {/* Pagination */}
        <div className="blog-pagination">
          {page > 1 && (
            <Link
              href={
                currentTag
                  ? `${basePath}/tag/${currentTag}?page=${page - 1}`
                  : `${basePath}?page=${page - 1}`
              }
              className="blog-pagination-link"
            >
              ← Previous
            </Link>
          )}

          <div className="blog-pagination-info">
            Page {page} of {total}
          </div>

          {page < total && (
            <Link
              href={
                currentTag
                  ? `${basePath}/tag/${currentTag}?page=${page + 1}`
                  : `${basePath}?page=${page + 1}`
              }
              className="blog-pagination-link"
            >
              Next →
            </Link>
          )}
        </div>
      </div>

      {/* Scoped CSS using styled-jsx */}
      <style jsx>{`
        .blog-list {
          display: grid;
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
        }

        .blog-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 8px;
          align-items: center;
        }

        .blog-tags > span {
          font-weight: bold;
          margin-right: 1rem;
        }

        .tag-link {
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          text-decoration: none;
          font-size: 0.875rem;
          transition: background 0.2s ease, color 0.2s ease;
          background: #e0e0e0;
          color: #333;
        }

        .tag-link.active {
          background: #007bff;
          color: #fff;
          font-weight: bold;
        }

        .no-posts-found {
          text-align: center;
          padding: 3rem 2rem;
          color: #666;
          font-size: 1.125rem;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .blog-list-item {
          display: grid;
          grid-template-columns: 300px 1fr; /* Default for desktop */
          gap: 1.5rem;
          padding: 1.5rem;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          transition: box-shadow 0.2s ease;
        }
        .blog-list-item:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .blog-list-image-wrapper {
          overflow: hidden;
          border-radius: 6px;
        }
        /* Style child Image component on parent link hover */
        .blog-list-image-wrapper :global(img) {
          transition: transform 0.3s ease-in-out;
        }
        .blog-list-image-wrapper a:hover :global(img) {
          transform: scale(1.05);
        }

        .blog-list-content {
          display: flex;
          flex-direction: column;
        }

        .blog-list-title {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0 0 0.5rem 0;
        }
        .blog-list-title a {
          color: #1a1a1a;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .blog-list-title a:hover {
          color: #007bff;
        }

        .blog-list-excerpt {
          color: #666;
          line-height: 1.6;
          margin-bottom: 1rem;
          flex-grow: 1; /* Pushes meta/tags to the bottom */
        }

        .blog-list-meta {
          display: flex;
          gap: 1rem;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
          color: #888;
          align-items: center;
        }

        .blog-list-author {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .blog-list-post-tags {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .blog-list-post-tags a {
          background: #f0f0f0;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          color: #666;
          text-decoration: none;
          transition: background 0.2s ease;
        }
        .blog-list-post-tags a:hover {
          background: #e0e0e0;
        }

        .blog-pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 2rem;
          margin-top: 2rem;
          padding: 1rem;
        }

        .blog-pagination-link {
          padding: 0.75rem 1.5rem;
          background: #fff;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          text-decoration: none;
          color: #333;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        .blog-pagination-link:hover {
          border-color: #007bff;
          background: #007bff;
          color: #fff;
        }

        .blog-pagination-info {
          padding: 0.75rem 1rem;
          background: #f8f9fa;
          border-radius: 8px;
          color: #666;
          font-weight: 500;
        }

        /* --- Responsive Styles --- */
        @media (max-width: 768px) {
          .blog-list {
            padding: 1rem;
            gap: 1.5rem;
          }
          .blog-list-item {
            /* Stack image on top of content */
            grid-template-columns: 1fr;
            padding: 1rem;
          }
          .blog-pagination {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </>
  );
}
