import React from "react";

export function BlogListLoading() {
  return (
    <div className="grid gap-8 max-w-6xl mx-auto animate-pulse">
      {/* Tags Section Skeleton */}
      <div className="flex flex-wrap gap-2 mb-8 p-4 bg-muted rounded-lg items-center">
        <div className="h-5 w-12 bg-muted-foreground/20 rounded mr-4"></div>
        <div className="h-7 w-12 bg-muted-foreground/20 rounded-md"></div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-7 w-16 bg-muted-foreground/20 rounded-md"
          ></div>
        ))}
      </div>

      {/* Posts List Skeleton */}
      {Array.from({ length: 6 }).map((_, index) => (
        <article
          key={index}
          className="grid grid-cols-1 md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr] gap-6 p-6 border border-border rounded-lg"
        >
          {/* Image skeleton */}
          <div className="overflow-hidden rounded-md">
            <div className="w-full h-40 bg-muted rounded-md"></div>
          </div>

          {/* Content skeleton */}
          <div className="flex flex-col">
            {/* Title skeleton */}
            <div className="space-y-2 mb-4">
              <div className="h-6 bg-muted rounded w-4/5"></div>
              <div className="h-6 bg-muted rounded w-2/3"></div>
            </div>

            {/* Excerpt skeleton */}
            <div className="space-y-2 mb-4 flex-grow">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/5"></div>
            </div>

            {/* Author and date skeleton */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-muted rounded-full"></div>
                <div className="h-4 w-20 bg-muted rounded"></div>
              </div>
              <div className="w-1 h-1 bg-muted rounded-full"></div>
              <div className="h-4 w-16 bg-muted rounded"></div>
            </div>

            {/* Tags skeleton */}
            <div className="flex flex-wrap gap-2 mt-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-6 w-12 bg-muted rounded-md"></div>
              ))}
            </div>
          </div>
        </article>
      ))}

      {/* Pagination skeleton */}
      <div className="flex justify-center items-center gap-8 mt-8 p-4">
        <div className="h-12 w-24 bg-muted rounded-lg"></div>
        <div className="h-12 w-20 bg-muted rounded-lg"></div>
        <div className="h-12 w-20 bg-muted rounded-lg"></div>
      </div>
    </div>
  );
}
