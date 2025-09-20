import { remark } from "remark";
import remarkHtml from "remark-html";

export async function processMarkdownContent(
  markdown: string
): Promise<string> {
  // Process markdown content to HTML
  const processedContent = await remark()
    .use(remarkHtml, { sanitize: true })
    .process(markdown);
  return processedContent.toString();
}
