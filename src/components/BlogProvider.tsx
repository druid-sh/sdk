import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { mockBlogPosts, mockCategories } from "../data";
import type { BlogPost, Category } from "../types";

interface BlogContextType {
  posts: BlogPost[];
  categories: Category[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  filteredPosts: BlogPost[];
  getPostBySlug: (slug: string) => BlogPost | undefined;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = selectedCategory
    ? mockBlogPosts.filter((post) => post.category === selectedCategory)
    : mockBlogPosts;

  const getPostBySlug = (slug: string): BlogPost | undefined => {
    return mockBlogPosts.find((post) => post.slug === slug);
  };

  return (
    <BlogContext.Provider
      value={{
        posts: mockBlogPosts,
        categories: mockCategories,
        selectedCategory,
        setSelectedCategory,
        filteredPosts,
        getPostBySlug,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};
