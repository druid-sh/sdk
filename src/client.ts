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

const DEFAULT_PAGINATION_LIMIT = 10;

/**
 * DruidClient - A TypeScript client for interacting with the Druid Blog API
 *
 * This client provides methods to fetch blog posts, tags, and manage pagination
 * for a blog system. It handles authentication via API key and provides a
 * clean interface for common blog operations.
 *
 */
class DruidClient {
  private readonly client: Client;
  private readonly config: Required<BlogConfig>;

  /** The site name from the configuration */
  siteName: string;

  /**
   * Creates a new DruidClient instance
   *
   */
  constructor(config: BlogConfig) {
    const defaults = {
      paginationLimit: DEFAULT_PAGINATION_LIMIT,
    } as const satisfies Partial<BlogConfig>;
    this.config = { ...defaults, ...config };
    this.siteName = this.config.siteName;
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
    const res = await this.client.api.blog.tags[":tagId"].$get({
      param: { tagId: tag },
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
    page: number,
    limit: number
  ): Promise<Pick<BlogListResponse, "posts" | "pagination">> {
    const res = await this.client.api.blog.posts.$get({
      query: {
        page: page.toString(),
        limit: limit.toString(),
      },
    });
    const data = await res.json();
    // if ("error" in data) {
    //   throw new Error(data.error);
    // }
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
    tag: string,
    page: number,
    limit: number
  ): Promise<Pick<BlogListResponse, "posts" | "pagination">> {
    const res = await this.client.api.blog.tags[":tagId"].posts.$get({
      query: {
        page: page.toString(),
        limit: limit.toString(),
      },
      param: { tagId: tag },
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
  private async fetchTags(): Promise<Tag[]> {
    const res = await this.client.api.blog.tags.$get({
      param: {},
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
  private async fetchSlugs(): Promise<Slug[]> {
    const res = await this.client.api.blog.slugs.$get({
      param: {},
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
  private async fetchPost(slug: string): Promise<BlogPost> {
    const res = await this.client.api.blog.posts[":postId"].$get({
      param: { postId: slug },
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
   */
  async getPosts(page = 1): Promise<BlogListResponse> {
    const { posts, pagination } = await this.fetchPosts(
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
   */
  async getPost(slug: string): Promise<BlogPostResponse> {
    const post = await this.fetchPost(slug);
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
   */
  async getPostsByTag(tag: string, page = 1): Promise<BlogListResponse> {
    const { posts, pagination } = await this.fetchPostsByTag(
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
   */
  async getTags(): Promise<Tag[]> {
    const tags = await this.fetchTags();
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
   */
  async getSlugs(): Promise<Slug[]> {
    const slugs = await this.fetchSlugs();
    return slugs;
  }

  /**
   * Gets detailed information about a specific tag
   *
   * @param tag - Tag slug to retrieve information for
   * @returns Promise resolving to tag data including metadata
   * @throws {Error} When the tag cannot be found or fetched
   *
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
