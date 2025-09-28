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

/**
 * Configuration interface for the DruidClient blog system
 *
 * This interface defines all the required configuration parameters needed
 * to initialize and use the DruidClient for blog operations. It handles
 * authentication, routing, and pagination settings.
 *
 */
export interface BlogConfig {
  /**
   * API key for authenticating with the Druid Blog API
   *
   * This is a secret key that should be kept secure and never exposed
   * in client-side code. It's used to authenticate all requests to the
   * Druid API endpoints.
   *
   * @example "sk_live_abc123xyz789"
   * @see https://druid.sh/dashboard for obtaining an API key
   */
  apiKey: string;

  /**
   * Base path for blog routes in your application
   *
   * This path will be prepended to all blog-related URLs. It should start
   * with a forward slash and represent where your blog is mounted in your
   * application's routing structure.
   *
   * @default "/blog"
   * @example "/blog" - Blog accessible at yoursite.com/blog
   * @example "/articles" - Blog accessible at yoursite.com/articles
   * @example "/news" - Blog accessible at yoursite.com/news
   * @example "/" - Blog mounted at root of site
   */
  basePath?: string;

  /**
   * Display name for your blog/site
   *
   * This name is used throughout the blog interface for branding purposes.
   * It appears in page titles, navigation, and other UI elements.
   *
   * @default "Druid"
   * @example "Tech Insights Blog"
   * @example "Company News & Updates"
   * @example "Developer Journal"
   */
  siteName?: string;

  /**
   * Number of blog posts to display per page
   *
   * This controls pagination behavior across all blog list views. Higher
   * numbers mean fewer pages but longer load times. Lower numbers mean
   * more pages but faster individual page loads.
   *
   * @minimum 1
   * @maximum 25
   * @default 10
   * @example 5 - For mobile-friendly short pages
   * @example 10 - Standard blog pagination
   * @example 20 - For content-heavy blogs
   */
  paginationLimit?: number;
}

export interface BlogListResponse {
  posts: BlogPost[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  allTags: Tag[];
  basePath: string;
  currentTag?: string;
}

export interface BlogPostResponse {
  post: BlogPost | null;
  basePath: string;
}

export type Slug = Pick<BlogPost, "slug">;

export type Pages = {
  page: string;
};

export type TagPages = Pages & {
  tag: string;
};
