import React from "react";

export function BlogPostLoading() {
  return (
    <div className="animate-pulse">
      {/* Back button skeleton */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="h-4 w-32 bg-muted rounded"></div>
      </div>

      <article className="max-w-3xl mx-auto">
        {/* Header skeleton */}
        <header className="mb-8 border-b pb-8">
          {/* Title skeleton */}
          <div className="space-y-3 mb-6">
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-8 bg-muted rounded w-1/2"></div>
          </div>

          {/* Author and date skeleton */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm mb-6">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-muted rounded-full"></div>
              <div className="h-4 w-24 bg-muted rounded"></div>
            </div>
            <div className="w-1 h-1 bg-muted rounded-full"></div>
            <div className="h-4 w-20 bg-muted rounded"></div>
          </div>

          {/* Tags skeleton */}
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-6 w-16 bg-muted rounded-full"></div>
            ))}
          </div>
        </header>

        {/* Cover image skeleton */}
        <div className="my-8">
          <div className="w-full h-80 bg-muted rounded-lg"></div>
        </div>

        {/* Content skeleton */}
        <div className="space-y-6">
          {/* Paragraph skeletons */}
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
            <div className="h-4 bg-muted rounded w-4/5"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
          </div>

          {/* Heading skeleton */}
          <div className="h-6 bg-muted rounded w-2/3 mt-8"></div>

          {/* More paragraphs */}
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-4/5"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
          </div>

          {/* Code block skeleton */}
          <div className="bg-muted rounded-lg p-4 mt-6">
            <div className="space-y-2">
              <div className="h-3 bg-muted-foreground/20 rounded w-3/4"></div>
              <div className="h-3 bg-muted-foreground/20 rounded w-1/2"></div>
              <div className="h-3 bg-muted-foreground/20 rounded w-5/6"></div>
              <div className="h-3 bg-muted-foreground/20 rounded w-2/3"></div>
            </div>
          </div>

          {/* More content */}
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
            <div className="h-4 bg-muted rounded w-4/5"></div>
          </div>
        </div>
      </article>
    </div>
  );
}
