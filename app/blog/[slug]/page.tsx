import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllSlugs } from "@/lib/posts";
import { MDXRemote } from "next-mdx-remote/rsc";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Back */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-[#525252] hover:text-[#f97316] transition-colors mb-10"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Writing
      </Link>

      {/* Post header */}
      <header className="mb-10 pb-8 border-b border-[#1a1a1a] max-w-2xl">
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono text-[#525252] border border-[#222] px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#f5f5f5] leading-tight mb-4">
          {post.title}
        </h1>

        {post.description && (
          <p className="text-[#737373] text-lg leading-relaxed mb-5">
            {post.description}
          </p>
        )}

        <div className="flex items-center gap-4 text-xs font-mono text-[#525252]">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.readingTime && (
            <>
              <span className="text-[#2a2a2a]">·</span>
              <span>{post.readingTime}</span>
            </>
          )}
        </div>
      </header>

      {/* Post content */}
      <article className="prose max-w-2xl">
        <MDXRemote source={post.content} />
      </article>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-[#1a1a1a] max-w-2xl">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[#525252] hover:text-[#f97316] transition-colors"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to writing
        </Link>
      </div>
    </div>
  );
}
