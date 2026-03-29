"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import ProjectCard from "@/components/project-card";
import PostCard from "@/components/post-card";
import HeroTerminal from "@/components/hero-terminal";

const featuredProjects = [
  {
    title: "Inference Mesh",
    description:
      "A lightweight orchestration layer for routing LLM requests across multiple providers based on latency, cost, and capability constraints.",
    tags: ["AI", "Systems"] as const,
    status: "active" as const,
  },
  {
    title: "Cortex",
    description:
      "An open-source CLI for building, testing, and deploying structured prompt pipelines. Think dbt but for AI inference workflows.",
    tags: ["AI", "Software"] as const,
    status: "wip" as const,
  },
  {
    title: "Servo Frame v3",
    description:
      "Parametric 3D-printed motion platform for camera stabilization. Full CAD files, BOM, and controller firmware.",
    tags: ["Hardware", "Software"] as const,
    status: "shipped" as const,
  },
];

const latestPosts = [
  {
    title: "On Building Systems That Think",
    description:
      "A practical look at what it actually takes to build AI-powered systems that work reliably in production — and why most tutorials miss the hard parts.",
    date: "2025-01-14",
    slug: "on-building-systems-that-think",
    readingTime: "6 min read",
  },
  {
    title: "3D Printing Functional Hardware: What I've Learned After 200+ Hours",
    description:
      "The gap between 3D printing as a hobby and 3D printing as an engineering tool is mostly about tolerances, material selection, and a willingness to throw away your first ten prints.",
    date: "2024-11-28",
    slug: "3d-printing-functional-hardware",
    readingTime: "7 min read",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#1a1a1a]">
        {/* Dot grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #2a2a2a 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 50% 0%, black 40%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 50% 0%, black 40%, transparent 100%)",
          }}
        />

        {/* Subtle orange glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center top, rgba(249,115,22,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-5xl mx-auto px-6 py-28 md:py-36">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: text */}
            <motion.div initial="hidden" animate="visible">
              <motion.p
                custom={0}
                variants={fadeUp}
                className="text-xs font-mono text-[#f97316] tracking-widest uppercase mb-6"
              >
                Primate Labs
              </motion.p>

              <motion.h1
                custom={1}
                variants={fadeUp}
                className="text-4xl md:text-5xl font-bold tracking-tight text-[#f5f5f5] leading-[1.1] mb-6"
              >
                Where{" "}
                <span className="text-[#f97316]">software</span>,{" "}
                AI systems, and hardware get built.
              </motion.h1>

              <motion.p
                custom={2}
                variants={fadeUp}
                className="text-[#737373] text-lg leading-relaxed mb-10"
              >
                A running build log. Real projects, field notes, and how
                things actually work.
              </motion.p>

              <motion.div
                custom={3}
                variants={fadeUp}
                className="flex flex-wrap gap-3"
              >
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 bg-[#f97316] text-black text-sm font-semibold px-5 py-2.5 hover:bg-[#ea6c0c] transition-colors"
                >
                  See the work
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 border border-[#2a2a2a] text-[#a3a3a3] text-sm font-medium px-5 py-2.5 hover:border-[#3a3a3a] hover:text-[#f5f5f5] transition-colors"
                >
                  Read the writing
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: terminal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="hidden lg:flex h-[340px] items-center justify-center"
            >
              <HeroTerminal />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-mono text-[#525252] tracking-widest uppercase mb-1">
              Selected work
            </p>
            <h2 className="text-xl font-semibold text-[#f5f5f5] tracking-tight">
              What I&apos;m building
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-xs font-mono text-[#525252] hover:text-[#f97316] transition-colors flex items-center gap-1"
          >
            All work
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1a1a1a]">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
              className="bg-[#0a0a0a]"
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <hr className="border-[#1a1a1a]" />
      </div>

      {/* Latest Posts */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-mono text-[#525252] tracking-widest uppercase mb-1">
              Writing
            </p>
            <h2 className="text-xl font-semibold text-[#f5f5f5] tracking-tight">
              Field notes
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-xs font-mono text-[#525252] hover:text-[#f97316] transition-colors flex items-center gap-1"
          >
            All writing
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div>
          {latestPosts.map((post) => (
            <PostCard key={post.slug} {...post} />
          ))}
        </div>
      </section>
    </div>
  );
}
