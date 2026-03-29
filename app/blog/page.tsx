import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/post-card";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Technical writing on software systems, AI engineering, hardware, and building things.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12 border-b border-[#1a1a1a] pb-8">
        <p className="text-xs font-mono text-[#f97316] tracking-widest uppercase mb-3">
          Writing
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-[#f5f5f5] mb-3">
          Blog
        </h1>
        <p className="text-[#737373] text-base max-w-lg leading-relaxed">
          Technical writing on systems design, AI engineering, hardware
          experiments, and the craft of building things. No tutorials. Mostly
          things I figured out the hard way.
        </p>
      </div>

      {/* Posts */}
      {posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <PostCard key={post.slug} {...post} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-[#525252] font-mono text-sm">
            No posts yet. Check back soon.
          </p>
        </div>
      )}
    </div>
  );
}
