export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  slug: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  featured?: boolean;
  coverImage?: string;
}

export interface BlogConfig {
  apiKey: string;
  blogId: string;
  baseUrl?: string;
}

export interface BlogListResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  limit: number;
  allTags: string[];
}
