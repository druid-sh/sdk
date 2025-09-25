import parse, { domToReact } from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BlogPostResponse } from "../types";
import CopyButton from "./CopyButton";

interface BlogPostProps {
  data: BlogPostResponse;
}

const isInternalLink = (href: string): boolean => {
  return (
    href.startsWith("/") ||
    href.startsWith("#") ||
    (!href.startsWith("http://") && !href.startsWith("https://"))
  );
};

export async function BlogPost({ data }: BlogPostProps) {
  const { post, basePath } = data;

  if (!post) {
    return (
      <div className="flex h-screen items-center justify-center">
        Post not found
      </div>
    );
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Link
          href={basePath}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>← Back to Blog</span>
        </Link>
      </div>

      <header className="mb-8 border-b pb-8">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-foreground">
          {post.title}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            {post.author.avatar && (
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={28}
                height={28}
                className="rounded-full"
              />
            )}
            <span className="font-medium text-foreground">
              {post.author.name}
            </span>
          </div>
          <span>•</span>
          <time dateTime={post.publishedAt}>{formattedDate}</time>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag.slug}
              href={`${basePath}/tag/${tag.slug}`}
              className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80"
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      </header>

      {post.coverImage && (
        <div className="my-8">
          <Image
            src={post.coverImage}
            alt={post.title}
            width={1200}
            height={600}
            sizes="(max-width: 800px) 100vw, 800px"
            className="w-full h-auto object-cover rounded-lg border"
            priority
          />
        </div>
      )}

      <div
        className="prose prose-lg dark:prose-invert max-w-none 
                   prose-headings:font-bold prose-headings:tracking-tight 
                   prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                   prose-blockquote:border-l-primary
                   prose-img:rounded-lg prose-img:border"
      >
        {parse(post.content, {
          replace: (domNode: any) => {
            // Only process element nodes, not text nodes or other types
            if (domNode.type !== "tag") {
              return;
            }

            if (domNode.name === "img") {
              const { src, alt, width, height } = domNode.attribs || {};
              return (
                <Image
                  key={src}
                  src={src}
                  alt={alt || ""}
                  width={width ? parseInt(width) : 800}
                  height={height ? parseInt(height) : 600}
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="w-full h-auto object-cover rounded-lg border"
                />
              );
            } else if (domNode.name === "a") {
              const { href, target, rel, ...otherAttribs } =
                domNode.attribs || {};

              if (!href) {
                return;
              }

              const children = domNode.children
                ? domToReact(domNode.children)
                : null;

              if (isInternalLink(href)) {
                return (
                  <Link key={href} href={href} {...otherAttribs}>
                    {children}
                  </Link>
                );
              } else {
                return (
                  <a
                    key={href}
                    href={href}
                    target={target || "_blank"}
                    rel={rel || "noopener noreferrer"}
                    {...otherAttribs}
                  >
                    {children}
                  </a>
                );
              }
            } else if (domNode.name === "pre") {
              // const hasCodeBlock = domNode.children?.some(
              //   (child: any) =>
              //     child.type === "tag" &&
              //     child.name === "code" &&
              //     child.attribs?.class?.includes("language-")
              // );

              // if (hasCodeBlock) {
              const codeElement = domNode.children?.find(
                (child: any) => child.type === "tag" && child.name === "code"
              );

              const getTextContent = (node: any): string => {
                if (node.type === "text") {
                  return node.data || "";
                }
                if (node.children) {
                  return node.children.map(getTextContent).join("");
                }
                return "";
              };

              const codeText = codeElement ? getTextContent(codeElement) : "";

              const existingClass = domNode.attribs?.class || "";
              const newClass = existingClass.includes("hljs")
                ? existingClass
                : `${existingClass} hljs border`.trim();

              return (
                <div className="relative group">
                  <pre {...domNode.attribs} className={newClass}>
                    {domToReact(domNode.children)}
                  </pre>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <CopyButton text={codeText} />
                  </div>
                </div>
              );
              // }
            }

            // For all other elements, let html-react-parser handle them normally
            return;
          },
        })}
      </div>
    </article>
  );
}
