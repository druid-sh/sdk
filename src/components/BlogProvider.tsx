import { createContext, useState } from "react";
import type { ReactNode } from "react";
import { mockBlogPosts, mockCategories } from "../data";
import type { BlogPost, Category } from "../types";

export interface BlogContextType {
  posts: BlogPost[];
  categories: Category[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  filteredPosts: BlogPost[];
  getPostBySlug: (slug: string) => BlogPost | undefined;
}

export const BlogContext = createContext<BlogContextType | undefined>(
  undefined
);

export const BlogProvider = ({
  children,
  apiKey,
}: {
  children: ReactNode;
  apiKey: string;
}) => {
  // Validate API key
  if (!apiKey || apiKey.trim() === "") {
    throw new Error("BlogProvider requires a valid API key to be provided");
  }

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
