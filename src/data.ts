import type { BlogPost } from "./types";

export const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "getting-started-with-typescript",
    title: "Getting Started with TypeScript",
    content:
      "TypeScript is a powerful superset of JavaScript that adds static typing to the language. In this post, we'll explore the basics of TypeScript and how it can improve your development experience.",
    publishedAt: "2024-01-15T10:00:00Z",
    category: "technology",
    image: "https://picsum.photos/300/200?random=1",
  },
  {
    id: "2",
    slug: "react-hooks-guide",
    title: "A Complete Guide to React Hooks",
    content:
      "React Hooks have revolutionized how we write React components. This comprehensive guide covers all the essential hooks and best practices for using them effectively in your applications.",
    publishedAt: "2024-01-22T14:30:00Z",
    category: "frontend",
    image: "https://picsum.photos/300/200?random=2",
  },
  {
    id: "3",
    slug: "building-scalable-nodejs-apps",
    title: "Building Scalable Node.js Applications",
    content:
      "Learn the patterns and practices for building scalable Node.js applications that can handle high traffic and maintain performance under load.",
    publishedAt: "2024-02-01T09:15:00Z",
    category: "backend",
    image: "https://picsum.photos/300/200?random=3",
  },
  {
    id: "4",
    slug: "css-grid-vs-flexbox",
    title: "CSS Grid vs Flexbox: When to Use Each",
    content:
      "Understanding the differences between CSS Grid and Flexbox is crucial for modern web development. This post explores their strengths and use cases.",
    publishedAt: "2024-02-08T16:45:00Z",
    category: "frontend",
    image: "https://picsum.photos/300/200?random=4",
  },
  {
    id: "5",
    slug: "machine-learning-for-beginners",
    title: "Machine Learning for Beginners",
    content:
      "Machine learning can seem intimidating, but this post breaks down the fundamental concepts and gets you started with your first ML project.",
    publishedAt: "2024-02-15T11:20:00Z",
    category: "ai",
    image: "https://picsum.photos/300/200?random=5",
  },
  {
    id: "6",
    slug: "docker-containerization-guide",
    title: "Docker Containerization Guide",
    content:
      "Docker has become essential for modern development workflows. Learn how to containerize your applications and streamline your deployment process.",
    publishedAt: "2024-02-22T13:10:00Z",
    category: "devops",
    image: "https://picsum.photos/300/200?random=6",
  },
  {
    id: "7",
    slug: "responsive-design-principles",
    title: "Responsive Design Principles",
    content:
      "Creating websites that work perfectly on all devices requires understanding responsive design principles. This guide covers everything you need to know.",
    publishedAt: "2024-03-01T15:30:00Z",
    category: "design",
    image: "https://picsum.photos/300/200?random=7",
  },
  {
    id: "8",
    slug: "graphql-api-development",
    title: "GraphQL API Development",
    content:
      "GraphQL offers a more efficient and flexible approach to API development compared to REST. Learn how to build GraphQL APIs that your clients will love.",
    publishedAt: "2024-03-08T10:45:00Z",
    category: "backend",
    image: "https://picsum.photos/300/200?random=8",
  },
  {
    id: "9",
    slug: "javascript-testing-strategies",
    title: "JavaScript Testing Strategies",
    content:
      "Testing is crucial for maintaining code quality. This post explores different testing strategies and tools available for JavaScript applications.",
    publishedAt: "2024-03-15T12:00:00Z",
    category: "testing",
    image: "https://picsum.photos/300/200?random=9",
  },
  {
    id: "10",
    slug: "web-performance-optimization",
    title: "Web Performance Optimization",
    content:
      "Performance matters for user experience and SEO. Discover techniques and best practices for optimizing your web applications' performance.",
    publishedAt: "2024-03-22T14:20:00Z",
    category: "performance",
    image: "https://picsum.photos/300/200?random=10",
  },
  {
    id: "11",
    slug: "python-data-analysis",
    title: "Python for Data Analysis",
    content:
      "Python has become the go-to language for data analysis. Learn how to use pandas, numpy, and other libraries to analyze and visualize data effectively.",
    publishedAt: "2024-03-29T09:30:00Z",
    category: "data",
    image: "https://picsum.photos/300/200?random=11",
  },
  {
    id: "12",
    slug: "vuejs-component-patterns",
    title: "Vue.js Component Patterns",
    content:
      "Vue.js offers powerful patterns for building reusable components. This guide explores the most effective patterns for Vue.js development.",
    publishedAt: "2024-04-05T16:15:00Z",
    category: "frontend",
    image: "https://picsum.photos/300/200?random=12",
  },
  {
    id: "13",
    slug: "database-design-principles",
    title: "Database Design Principles",
    content:
      "Good database design is fundamental to application performance and maintainability. Learn the principles that will help you design better databases.",
    publishedAt: "2024-04-12T11:40:00Z",
    category: "database",
    image: "https://picsum.photos/300/200?random=13",
  },
  {
    id: "14",
    slug: "mobile-app-development-trends",
    title: "Mobile App Development Trends 2024",
    content:
      "The mobile development landscape is constantly evolving. Stay ahead of the curve with this overview of the latest trends and technologies.",
    publishedAt: "2024-04-19T13:25:00Z",
    category: "mobile",
    image: "https://picsum.photos/300/200?random=14",
  },
  {
    id: "15",
    slug: "security-best-practices",
    title: "Security Best Practices for Web Applications",
    content:
      "Security should be a top priority for every web application. Learn essential security practices to protect your applications and users.",
    publishedAt: "2024-04-26T10:10:00Z",
    category: "security",
    image: "https://picsum.photos/300/200?random=15",
  },
];

export const mockCategories = [
  { id: "1", name: "Technology", slug: "technology" },
  { id: "2", name: "Frontend", slug: "frontend" },
  { id: "3", name: "Backend", slug: "backend" },
  { id: "4", name: "AI & Machine Learning", slug: "ai" },
  { id: "5", name: "DevOps", slug: "devops" },
  { id: "6", name: "Design", slug: "design" },
  { id: "7", name: "Testing", slug: "testing" },
  { id: "8", name: "Performance", slug: "performance" },
  { id: "9", name: "Data Science", slug: "data" },
  { id: "10", name: "Database", slug: "database" },
  { id: "11", name: "Mobile", slug: "mobile" },
  { id: "12", name: "Security", slug: "security" },
];
