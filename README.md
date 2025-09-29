# @druid-sh/sdk

A dead-simple SDK for adding a fully-featured blog to your Next.js 15 app. No markdown wrangling, no separate domains—just install, configure, and ship.

## Why Druid?

- **Your Domain, Your SEO**: All blog traffic goes to `yourapp.com/blog`, building _your_ authority
- **5-Minute Setup**: Seriously. Install, configure, deploy. Done.
- **Native Integration**: Built specifically for Next.js 15 App Router with TypeScript
- **Beautiful by Default**: Works seamlessly with shadcn/ui and Tailwind CSS
- **Zero Maintenance**: No CMS to host, no security patches, no database migrations

## Prerequisites

Your Next.js project needs:

- Next.js `^15.5.0` with App Router and TypeScript
- React `^19.1.1`
- Tailwind CSS `^4.1.12`
- shadcn/ui components

## Installation

```bash
npm install @druid-sh/sdk
# or
pnpm install @druid-sh/sdk
# or
yarn add @druid-sh/sdk
```

## Quick Start

For complete setup instructions, visit our [Quick Start Guide](https://druid.sh/docs/quick-start).

### 1. Configure Styles

Add Druid styles to your `globals.css`:

```css
@import "../../node_modules/@druid-sh/sdk/dist";
@import "highlight.js/styles/github.css";

.dark {
  @import "highlight.js/styles/github-dark.css";
}
```

### 2. Initialize the Client

Create a client instance with your API key:

```typescript
import { DruidClient } from "@druid-sh/sdk";

export const druid = new DruidClient({
  apiKey: process.env.NEXT_PUBLIC_DRUID_API_KEY,
});
```

### 3. Create Your Routes

The SDK provides everything you need to create:

- Blog listing pages (`/blog`)
- Individual post pages (`/blog/post/[slug]`)
- Tag filtering (`/blog/tag/[tag]`)
- Pagination for all views

Each route leverages Next.js 15's async params, static generation, and ISR for optimal performance.

## Core Features

### SEO Built-In

The SDK includes `generateBlogPostMetadata()` and `generateBlogListMetadata()` helpers that handle Open Graph tags, Twitter cards, and structured data automatically.

### Syntax Highlighting

Code blocks work out of the box with Highlight.js integration. Just import your preferred theme in your CSS.

### Type-Safe API

Built with TypeScript from the ground up. Full autocomplete support and type checking for all SDK methods.

### Static Generation

Uses `generateStaticParams()` for build-time generation of all blog routes. ISR with 60-second revalidation keeps content fresh without rebuilding.

## API Reference

### `DruidClient`

```typescript
const druid = new DruidClient({ apiKey: string });
```

#### Methods

- `getPosts(page: number)` - Get paginated blog posts
- `getPost(slug: string)` - Get a single post by slug
- `getPostsByTag(tag: string, page: number)` - Get posts filtered by tag
- `getSlugs()` - Get all post slugs for static generation
- `getTags()` - Get all available tags
- `getPages()` - Get all page numbers for pagination
- `getTagPages()` - Get all tag/page combinations

### Components

- `<BlogList data={data} />` - Renders paginated post listings
- `<BlogPost data={data} />` - Renders individual post content

### Utilities

- `generateBlogPostMetadata(post, title)` - Generate SEO metadata for posts
- `generateBlogListMetadata(title)` - Generate SEO metadata for listings

## Configuration

Set your API key as an environment variable:

```env
NEXT_PUBLIC_DRUID_API_KEY=your_api_key_here
```

Get your API key from the [Druid Dashboard](https://druid.sh/dashboard).

## Examples

Check out our [demo repository](https://github.com/druid-sh/demo) for a complete working example.

## Support

- **Documentation**: [druid.sh/docs](https://druid.sh/docs)
- **Dashboard**: [druid.sh/dashboard](https://druid.sh/dashboard)
- **Issues**: Stuck? Hit us up and we'll figure it out together

## License

MIT

---

Made with ❤️ in 🇱🇹
