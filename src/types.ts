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
  excerpt: string;
  slug: string;
  author: Author;
  publishedAt: string;
  updatedAt: string;
  tags: Tag[];
  coverImage: string;
}

export interface BlogConfig {
  apiKey: string;
  basePath: string;
  siteName: string;
}

export interface BlogListResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  limit: number;
  allTags: Tag[];
  basePath: string;
  currentTag?: string;
}

export interface BlogPostResponse {
  post: BlogPost | null;
  basePath: string;
}
