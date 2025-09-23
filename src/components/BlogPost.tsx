import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPostResponse } from "../types";

// 1. Import the CSS module file
import styles from "./BlogPost.module.css";

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
    // 2. Remove <style> blocks and apply classes from the imported `styles` object
    <article className={styles.blogPost}>
      <Link href={basePath} className={styles.backLink}>
        ← Back to Blog
      </Link>

      <header className={styles.blogPostHeader}>
        <h1 className={styles.blogPostTitle}>{post.title}</h1>
        <div className={styles.blogPostMeta}>
          <div className={styles.blogPostAuthor}>
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
        <div className={styles.blogPostTags}>
          {post.tags.map((tag) => (
            <Link key={tag.slug} href={`${basePath}/tag/${tag.slug}`}>
              #{tag.name}
            </Link>
          ))}
        </div>
      </header>

      {post.coverImage && (
        <div className={styles.blogPostCover}>
          <Image
            src={post.coverImage}
            alt={post.title}
            width={1200}
            height={600}
            sizes="(max-width: 800px) 100vw, 800px"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "8px",
            }}
            priority
          />
        </div>
      )}

      <div
        className={styles.blogPostContent}
        dangerouslySetInnerHTML={{
          __html: post.content,
        }}
      />
    </article>
  );
}
