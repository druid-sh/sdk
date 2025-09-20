export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  publishedAt: string;
  category: string;
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}
