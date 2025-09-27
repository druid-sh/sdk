import { hc } from "hono/client";
import {
  BlogConfig,
  BlogListResponse,
  BlogPost,
  BlogPostResponse,
  Tag,
  Slug,
  Pages,
  TagPages,
} from "./types";

// START OF MAGIC
// @ts-ignore
import type { BlogAppType } from "@api";
type Client = ReturnType<typeof hc<BlogAppType>>;
// END OF MAGIC

const API_URL = "https://api.druid.sh";

/**
 * DruidClient - A TypeScript client for interacting with the Druid Blog API
 *
 * This client provides methods to fetch blog posts, tags, and manage pagination
 * for a blog system. It handles authentication via API key and provides a
 * clean interface for common blog operations.
 *
 * @example
 * ```typescript
 * const client = new DruidClient({
 *   apiKey: 'your-api-key',
 *   projectId: 'your-project-id',
 *   siteName: 'My Blog',
 *   basePath: '/blog',
 *   paginationLimit: 10
 * });
 *
 * // Get paginated posts
 * const posts = await client.getPosts(1);
 *
 * // Get a specific post
 * const post = await client.getPost('my-blog-post-slug');
 * ```
 */
class DruidClient {
  private client: Client;

  /** The site name from the configuration */
  siteName: string;

  /**
   * Creates a new DruidClient instance
   *
   * @param config - Configuration object for the blog client
   * @param config.apiKey - API key for authentication
   * @param config.projectId - Project identifier
   * @param config.siteName - Name of the blog site
   * @param config.basePath - Base path for blog routes
   * @param config.paginationLimit - Number of posts per page
   */
  constructor(private readonly config: BlogConfig) {
    this.config = config;
    this.siteName = config.siteName;
    this.client = hc<BlogAppType>(API_URL, {
      headers: {
        "x-api-key": this.config.apiKey,
      },
    });
  }

  /**
   * Fetches a single tag by its identifier
   *
   * @private
   * @param tag - The tag identifier/slug to fetch
   * @returns Promise resolving to the tag data
   * @throws {Error} When the tag cannot be fetched or doesn't exist
   */
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

  /**
   * Fetches paginated blog posts
   *
   * @private
   * @param projectId - The project identifier
   * @param page - Page number (1-based)
   * @param limit - Number of posts per page
   * @returns Promise resolving to posts and pagination data
   * @throws {Error} When posts cannot be fetched
   */
  private async fetchPosts(
    projectId: string,
    page: number,
    limit: number
  ): Promise<Pick<BlogListResponse, "posts" | "pagination">> {
    const res = await this.client.api.blog[":projectId"].posts.$get({
      query: {
        page: page.toString(),
        limit: limit.toString(),
      },
      param: { projectId: projectId },
    });
    const data = await res.json();
    if ("error" in data) {
      throw new Error(data.error);
    }
    return data;
  }

  /**
   * Fetches paginated blog posts filtered by a specific tag
   *
   * @private
   * @param projectId - The project identifier
   * @param tag - Tag to filter posts by
   * @param page - Page number (1-based)
   * @param limit - Number of posts per page
   * @returns Promise resolving to filtered posts and pagination data
   * @throws {Error} When posts cannot be fetched
   */
  private async fetchPostsByTag(
    projectId: string,
    tag: string,
    page: number,
    limit: number
  ): Promise<Pick<BlogListResponse, "posts" | "pagination">> {
    const res = await this.client.api.blog[":projectId"].tags[
      ":tagId"
    ].posts.$get({
      query: {
        page: page.toString(),
        limit: limit.toString(),
      },
      param: { projectId: projectId, tagId: tag },
    });
    const data = await res.json();
    if ("error" in data) {
      throw new Error(data.error as string);
    }
    return data;
  }

  /**
   * Fetches all available tags for a project
   *
   * @private
   * @param projectId - The project identifier
   * @returns Promise resolving to array of tags
   * @throws {Error} When tags cannot be fetched
   */
  private async fetchTags(projectId: string): Promise<Tag[]> {
    const res = await this.client.api.blog[":projectId"].tags.$get({
      param: { projectId: projectId },
    });
    const data = await res.json();
    if ("error" in data) {
      throw new Error(data.error as string);
    }
    return data;
  }

  /**
   * Fetches all available post slugs for a project
   *
   * @private
   * @param projectId - The project identifier
   * @returns Promise resolving to array of slugs
   * @throws {Error} When slugs cannot be fetched
   */
  private async fetchSlugs(projectId: string): Promise<Slug[]> {
    const res = await this.client.api.blog[":projectId"].slugs.$get({
      param: { projectId: projectId },
    });
    const data = await res.json();
    if ("error" in data) {
      throw new Error(data.error as string);
    }
    return data.slugs;
  }

  /**
   * Fetches a single blog post by its slug
   *
   * @private
   * @param projectId - The project identifier
   * @param slug - The post slug/identifier
   * @returns Promise resolving to the blog post data
   * @throws {Error} When the post cannot be fetched or doesn't exist
   */
  private async fetchPost(projectId: string, slug: string): Promise<BlogPost> {
    const res = await this.client.api.blog[":projectId"].posts[":postId"].$get({
      param: { projectId: projectId, postId: slug },
    });
    const data = await res.json();
    if ("error" in data) {
      throw new Error(data.error as string);
    }
    return data;
  }

  /**
   * Gets paginated blog posts with all associated metadata
   *
   * @param page - Page number to retrieve (defaults to 1)
   * @returns Promise resolving to blog list response with posts, pagination, and tags
   * @throws {Error} When posts cannot be fetched
   *
   * @example
   * ```typescript
   * // Get first page of posts
   * const firstPage = await client.getPosts();
   *
   * // Get second page
   * const secondPage = await client.getPosts(2);
   * ```
   */
  async getPosts(page = 1): Promise<BlogListResponse> {
    const { posts, pagination } = await this.fetchPosts(
      this.config.projectId,
      page,
      this.config.paginationLimit
    );
    const allTags = await this.getTags();
    return {
      posts,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total: pagination.total,
        hasNext: pagination.hasNext,
        hasPrev: pagination.hasPrev,
        totalPages: pagination.totalPages,
      },
      allTags,
      basePath: this.config.basePath,
      currentTag: undefined,
    };
  }

  /**
   * Gets a single blog post by its slug
   *
   * @param slug - The unique slug identifier for the post
   * @returns Promise resolving to blog post response with post data and base path
   * @throws {Error} When the post cannot be found or fetched
   *
   * @example
   * ```typescript
   * const post = await client.getPost('my-awesome-blog-post');
   * console.log(post.post.title);
   * ```
   */
  async getPost(slug: string): Promise<BlogPostResponse> {
    const post = await this.fetchPost(this.config.projectId, slug);
    return {
      post,
      basePath: this.config.basePath,
    };
  }

  /**
   * Gets paginated blog posts filtered by a specific tag
   *
   * @param tag - Tag slug to filter posts by
   * @param page - Page number to retrieve (defaults to 1)
   * @returns Promise resolving to filtered blog list response
   * @throws {Error} When posts cannot be fetched or tag doesn't exist
   *
   * @example
   * ```typescript
   * // Get posts tagged with 'javascript'
   * const jsPosts = await client.getPostsByTag('javascript');
   *
   * // Get second page of JavaScript posts
   * const jsPostsPage2 = await client.getPostsByTag('javascript', 2);
   * ```
   */
  async getPostsByTag(tag: string, page = 1): Promise<BlogListResponse> {
    const { posts, pagination } = await this.fetchPostsByTag(
      this.config.projectId,
      tag,
      page,
      this.config.paginationLimit
    );
    const allTags = await this.getTags();
    return {
      posts,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total: pagination.total,
        hasNext: pagination.hasNext,
        hasPrev: pagination.hasPrev,
        totalPages: pagination.totalPages,
      },
      allTags,
      basePath: this.config.basePath,
      currentTag: tag,
    };
  }

  /**
   * Gets all available tags for the blog
   *
   * @returns Promise resolving to array of all tags
   * @throws {Error} When tags cannot be fetched
   *
   * @example
   * ```typescript
   * const tags = await client.getTags();
   * tags.forEach(tag => console.log(tag.name, tag.slug));
   * ```
   */
  async getTags(): Promise<Tag[]> {
    const tags = await this.fetchTags(this.config.projectId);
    return tags;
  }

  /**
   * Gets all available post slugs for the blog
   *
   * Useful for generating static routes or sitemaps
   *
   * @returns Promise resolving to array of all post slugs
   * @throws {Error} When slugs cannot be fetched
   *
   * @example
   * ```typescript
   * const slugs = await client.getSlugs();
   * // Use slugs to generate static routes
   * const routes = slugs.map(slug => `/blog/${slug.slug}`);
   * ```
   */
  async getSlugs(): Promise<Slug[]> {
    const slugs = await this.fetchSlugs(this.config.projectId);
    return slugs;
  }

  /**
   * Gets detailed information about a specific tag
   *
   * @param tag - Tag slug to retrieve information for
   * @returns Promise resolving to tag data including metadata
   * @throws {Error} When the tag cannot be found or fetched
   *
   * @example
   * ```typescript
   * const tagInfo = await client.getTag('javascript');
   * console.log(tagInfo.name, tagInfo.description);
   * ```
   */
  async getTag(tag: string): Promise<Tag> {
    const tagData = await this.fetchTag(tag);
    return tagData;
  }

  /**
   * Gets all possible tag page combinations for static generation
   *
   * This method is useful for static site generation where you need to
   * pre-generate all possible tag/page combinations.
   *
   * @returns Promise resolving to array of tag/page parameter combinations
   * @throws {Error} When tag or pagination data cannot be fetched
   *
   * @example
   * ```typescript
   * const tagPages = await client.getTagPages();
   * // Returns: [
   * //   { tag: 'javascript', page: '1' },
   * //   { tag: 'javascript', page: '2' },
   * //   { tag: 'react', page: '1' },
   * //   ...
   * // ]
   * ```
   */
  async getTagPages(): Promise<TagPages[]> {
    const tags = await this.getTags();
    const allParams = await Promise.all(
      tags.map(async (tag) => {
        const data = await this.getPostsByTag(tag.slug);
        const { totalPages } = data.pagination;
        return Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (page) => ({
            tag: tag.slug,
            page: String(page),
          })
        );
      })
    );
    return allParams.flat();
  }

  /**
   * Gets all possible page numbers for static generation
   *
   * This method is useful for static site generation where you need to
   * pre-generate all possible pagination pages.
   *
   * @returns Promise resolving to array of page parameter objects
   * @throws {Error} When pagination data cannot be fetched
   *
   * @example
   * ```typescript
   * const pages = await client.getPages();
   * // Returns: [
   * //   { page: '1' },
   * //   { page: '2' },
   * //   { page: '3' },
   * //   ...
   * // ]
   * ```
   */
  async getPages(): Promise<Pages[]> {
    const posts = await this.getPosts();
    return Array.from(
      { length: posts.pagination.totalPages },
      (_, i) => i + 1
    ).map((page) => ({
      page: String(page),
    }));
  }
}

export { DruidClient };
