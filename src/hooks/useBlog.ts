import { useContext } from "react";
import { BlogContext, type BlogContextType } from "../components/BlogProvider";

export const useBlog = (): BlogContextType => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};
