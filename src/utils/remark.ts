import { remark } from "remark";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";

export async function processMarkdownContent(
  markdown: string
): Promise<string> {
  // Process markdown content to HTML with GFM support
  const processedContent = await remark()
    .use(remarkGfm) // Add GFM support for strikethrough, tables, etc.
    .use(remarkHtml, { sanitize: true })
    .process(markdown);

  return processedContent.toString();
}
