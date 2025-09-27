import { hc } from "hono/client";
import {
  BlogConfig,
  BlogListResponse,
  BlogPost,
  BlogPostResponse,
  Tag,
  Slug,
} from "./types";

// START OF MAGIC
// @ts-ignore
import type { BlogAppType } from "@api";
type Client = ReturnType<typeof hc<BlogAppType>>;
// END OF MAGIC

const API_URL = "https://api.druid.sh";

class DruidClient {
  private client: Client;
  siteName: string;
  constructor(private readonly config: BlogConfig) {
    this.config = config;
    this.siteName = config.siteName;
    this.client = hc<BlogAppType>(API_URL, {
      headers: {
        "x-api-key": this.config.apiKey,
      },
    });
  }

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

  async getPost(slug: string): Promise<BlogPostResponse> {
    const post = await this.fetchPost(this.config.projectId, slug);

    return {
      post,
      basePath: this.config.basePath,
    };
  }

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

  async getTags(): Promise<Tag[]> {
    const tags = await this.fetchTags(this.config.projectId);
    return tags;
  }

  async getSlugs(): Promise<Slug[]> {
    const slugs = await this.fetchSlugs(this.config.projectId);
    return slugs;
  }

  async getTag(tag: string): Promise<Tag> {
    const tagData = await this.fetchTag(tag);
    return tagData;
  }
}

export { DruidClient };
