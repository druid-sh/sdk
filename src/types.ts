export interface Tag {
  name: string;
  slug: string;
}

export interface Author {
  name: string;
  avatar?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  slug: string;
  author: Author;
  excerpt: string;
  publishedAt: string;
  updatedAt: string;
  tags: Tag[];
  coverImage: string | null;
}

export interface BlogConfig {
  apiKey: string;
  basePath: string;
  siteName: string;
  projectId: string;
}

export interface BlogListResponse {
  posts: BlogPost[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
  allTags: Tag[];
  basePath: string;
  currentTag?: string;
}

export interface BlogPostResponse {
  post: BlogPost | null;
  basePath: string;
}

export type Slug = BlogPost["slug"];
