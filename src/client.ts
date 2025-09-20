import {
  BlogPost,
  BlogConfig,
  BlogListResponse,
  BlogPostResponse,
  Tag,
  Author,
} from "./types";
import { hc } from "hono/client";

// START OF MAGIC
// @ts-ignore
import type { AppType } from "@api";
type Client = ReturnType<typeof hc<AppType>>;
// END OF MAGIC

const API_URL = "http://localhost:8787";

class BlogusClient {
  private client: Client;
  siteName: string;
  constructor(private readonly config: BlogConfig) {
    this.config = config;
    this.siteName = config.siteName;
    this.client = hc<AppType>(API_URL, {
      headers: {
        "x-api-key": this.config.apiKey,
      },
    });
  }

  // Mock data for now - replace with real API calls later
  //   private getMockPosts(): BlogPost[] {
  //     return [
  //       {
  //         id: "1",
  //         title: "Getting Started with Next.js 14",
  //         content: `# Getting Started with Next.js 14

  // Next.js 14 brings exciting new features including improved App Router, better performance, and enhanced developer experience.

  // ![Next.js Logo](https://picsum.photos/600/300)

  // ## Key Features

  // - **App Router**: The future of Next.js routing
  // - **Server Components**: Better performance by default
  // - **Streaming**: Improved loading states

  // ## Installation

  // \`\`\`bash
  // npx create-next-app@latest my-app
  // \`\`\`

  // ![Development Setup](https://picsum.photos/600/200)

  // Start building amazing web applications today!`,
  //         slug: "getting-started-nextjs-14",
  //         author: { name: "John Doe", avatar: "https://picsum.photos/40" },
  //         publishedAt: "2024-01-15T10:00:00Z",
  //         tags: [
  //           { name: "Next.js", slug: "nextjs" },
  //           { name: "React", slug: "react" },
  //           { name: "Tutorial", slug: "tutorial" },
  //         ],
  //         updatedAt: "2024-01-20T10:00:00Z",
  //         coverImage: "https://picsum.photos/800/400",
  //       },
  //       {
  //         id: "2",
  //         title: "Building Scalable React Applications",
  //         content: `# Building Scalable React Applications

  // Learn the best practices for building large-scale React applications that are maintainable and performant.

  // ## Architecture Patterns

  // - Component composition
  // - State management strategies
  // - Performance optimization

  // ## Tools and Libraries

  // Essential tools for scaling your React apps effectively.`,
  //         slug: "scalable-react-applications",
  //         author: { name: "Jane Smith", avatar: "https://picsum.photos/40" },
  //         publishedAt: "2024-01-10T14:30:00Z",
  //         tags: [
  //           { name: "React", slug: "react" },
  //           { name: "Architecture", slug: "architecture" },
  //           { name: "Scalability", slug: "scalability" },
  //         ],
  //         updatedAt: "2024-01-15T14:30:00Z",
  //         coverImage: "https://picsum.photos/800/400",
  //       },
  //       {
  //         id: "3",
  //         title: "TypeScript Tips and Tricks",
  //         content: `# TypeScript Tips and Tricks

  // Advanced TypeScript patterns that will make you more productive.

  // ## Utility Types

  // - Partial<T>
  // - Pick<T, K>
  // - Omit<T, K>

  // ## Advanced Patterns

  // Learn about conditional types, mapped types, and more.`,
  //         slug: "typescript-tips-tricks",
  //         author: { name: "Mike Johnson" },
  //         publishedAt: "2024-01-05T09:15:00Z",
  //         tags: [
  //           { name: "TypeScript", slug: "typescript" },
  //           { name: "Tips", slug: "tips" },
  //           { name: "Advanced", slug: "advanced" },
  //         ],
  //         updatedAt: "2024-01-10T09:15:00Z",
  //         coverImage: "https://picsum.photos/800/400",
  //       },
  //     ];
  //   }

  private async fetchTag(tag: string): Promise<Tag> {
    const res = await this.client.api.blog[":projectId"].tags[":tagId"].$get({
      param: { projectId: this.config.projectId, tagId: tag },
    });

    const tagData = await res.json();

    if ("error" in tagData) {
      throw new Error(`Error fetching tag: ${tagData.error}`);
    }

    return tagData;
  }

  private async fetchPosts(projectId: string): Promise<BlogPost[]> {
    const res = await this.client.api.blog[":projectId"].posts.$get({
      param: { projectId: projectId },
    });
    const data = await res.json();

    if ("error" in data) {
      throw new Error(data.error);
    }
    console.log({ data });
    return data;
  }

  private async fetchPostsByTag(
    projectId: string,
    tag: string
  ): Promise<BlogPost[]> {
    const res = await this.client.api.blog[":projectId"].tags[
      ":tagId"
    ].posts.$get({
      param: { projectId: projectId, tagId: tag },
    });
    const data = await res.json();

    if ("error" in data) {
      throw new Error(data.error as string);
    }
    console.log({ data });
    return data;
  }

  private async fetchTags(projectId: string): Promise<Tag[]> {
    const res = await this.client.api.blog[":projectId"].tags.$get({
      param: { projectId: projectId },
    });

    const data = await res.json();

    if ("error" in data) {
      throw new Error(data.error as string);
    }
    console.log({ data });

    return data;
  }

  async fetchPost(projectId: string, slug: string): Promise<BlogPost> {
    const res = await this.client.api.blog[":projectId"].posts[":postId"].$get({
      param: { projectId: projectId, postId: slug },
    });

    const data = await res.json();

    if ("error" in data) {
      throw new Error(data.error as string);
    }
    console.log({ data });

    return data;
  }

  async getPosts(page = 1, limit = 10): Promise<BlogListResponse> {
    const allPosts = await this.fetchPosts(this.config.projectId);
    const startIndex = (page - 1) * limit;
    const posts = allPosts.slice(startIndex, startIndex + limit);
    const allTags = await this.getTags();

    return {
      posts,
      total: allPosts.length,
      page,
      limit,
      allTags,
      basePath: this.config.basePath,
      currentTag: undefined,
    };
  }

  async getPost(slug: string): Promise<BlogPostResponse> {
    const post = await this.fetchPost(this.config.projectId, slug);

    return {
      post,
      basePath: this.config.basePath,
    };
  }

  async getPostsByTag(
    tag: string,
    page = 1,
    limit = 10
  ): Promise<BlogListResponse> {
    const allPosts = await this.fetchPostsByTag(this.config.projectId, tag);
    const taggedPosts = allPosts.filter((post) =>
      post.tags.some((t) => t.slug === tag)
    );
    const startIndex = (page - 1) * limit;
    const posts = taggedPosts.slice(startIndex, startIndex + limit);
    const allTags = await this.getTags();

    return {
      posts,
      total: taggedPosts.length,
      page,
      limit,
      allTags,
      basePath: this.config.basePath,
      currentTag: tag,
    };
  }

  async getTags(): Promise<Tag[]> {
    const tags = await this.fetchTags(this.config.projectId);
    return tags;
  }

  async getTag(tag: string): Promise<Tag> {
    const tagData = await this.fetchTag(tag);
    return tagData;
  }
}

export { BlogusClient };
