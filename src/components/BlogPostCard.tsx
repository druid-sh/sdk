import type { BlogPost as BlogPostType } from "../types";
import styles from "./BlogPost.module.css";

// Utility function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Utility function to calculate reading time
const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};

interface BlogPostCardProps {
  post: BlogPostType;
  isFirst?: boolean;
}

export const BlogPostCard = ({ post, isFirst = false }: BlogPostCardProps) => {
  const readingTime = calculateReadingTime(post.content);
  const formattedDate = formatDate(post.publishedAt);

  return (
    <article
      className={`${styles.blogPost} ${isFirst ? styles.firstPost : ""}`}
    >
      <h3 className={styles.title}>{post.title}</h3>

      {/* Post metadata */}
      <div className={styles.metadata}>
        <span className={styles.category}>{post.category}</span>
        <span className={styles.date}>• {formattedDate}</span>
        <span className={styles.readingTime}>• {readingTime} min read</span>
      </div>

      <div className={styles.content}>
        {post.content.length > 200
          ? `${post.content.substring(0, 200)}...`
          : post.content}
      </div>
    </article>
  );
};
