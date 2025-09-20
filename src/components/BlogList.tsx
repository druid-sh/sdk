import { useBlog } from "../hooks/useBlog";
import { BlogPostCard } from "./BlogPostCard";
import styles from "./BlogList.module.css";

const BlogList = () => {
  const { filteredPosts, categories, selectedCategory, setSelectedCategory } =
    useBlog();

  return (
    <div className={styles.blogList}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.blogName}>My Blog</h1>
        <div className={styles.categoryFilter}>
          <button
            className={`${styles.categoryButton} ${
              selectedCategory === null ? styles.active : ""
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.categoryButton} ${
                selectedCategory === category.slug ? styles.active : ""
              }`}
              onClick={() => setSelectedCategory(category.slug)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Layout */}
      <div className={styles.posts}>
        {filteredPosts.length > 0 ? (
          <>
            {/* First post - full width */}
            <div className={styles.firstPost}>
              <BlogPostCard post={filteredPosts[0]} />
            </div>

            {/* Remaining posts - 3 column grid */}
            {filteredPosts.length > 1 && (
              <div className={styles.gridPosts}>
                {filteredPosts.slice(1).map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className={styles.noPosts}>
            No posts found for the selected category.
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
