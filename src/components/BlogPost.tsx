import { useBlog } from "./BlogProvider";
import styles from "./BlogPost.module.css";

interface BlogPostProps {
  slug: string;
}

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

export const BlogPost = ({ slug }: BlogPostProps) => {
  const { getPostBySlug } = useBlog();
  const post = getPostBySlug(slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  const readingTime = calculateReadingTime(post.content);
  const formattedDate = formatDate(post.publishedAt);

  return (
    <article className={styles.blogPost}>
      <header className={styles.header}>
        <h1 className={styles.title}>{post.title}</h1>

        {/* Post metadata */}
        <div className={styles.metadata}>
          <span className={styles.category}>{post.category}</span>
          <span className={styles.date}>• {formattedDate}</span>
          <span className={styles.readingTime}>• {readingTime} min read</span>
        </div>
      </header>

      <div className={styles.content}>{post.content}</div>
    </article>
  );
};
