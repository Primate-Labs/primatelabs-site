import type { Metadata } from "next";
import ProjectCard from "@/components/project-card";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of software, AI, hardware, and experimental projects built at Primate Labs.",
};

const projects = [
  {
    title: "Inference Mesh",
    description:
      "A lightweight orchestration layer for routing LLM requests across multiple providers. Handles failover, cost optimization, and latency-based routing. Built in Go with a minimal config-driven interface.",
    tags: ["AI", "Systems"] as const,
    status: "active" as const,
    href: "https://github.com/primatelabs/inference-mesh",
  },
  {
    title: "Cortex",
    description:
      "An open-source CLI for building, testing, and deploying structured prompt pipelines. Define prompts as code, version them, evaluate against golden datasets. Think dbt but for AI inference.",
    tags: ["AI", "Software"] as const,
    status: "wip" as const,
  },
  {
    title: "Servo Frame v3",
    description:
      "Parametric 3D-printed motion platform for camera stabilization. Uses dual servo gimbal with IMU feedback loop. Full CAD files, BOM, and STM32 controller firmware available on GitHub.",
    tags: ["Hardware", "Software"] as const,
    status: "shipped" as const,
    href: "https://github.com/primatelabs/servo-frame",
  },
  {
    title: "Logprobe",
    description:
      "A terminal UI for streaming and filtering log aggregators in real time. Supports CloudWatch, Datadog, and arbitrary JSON streams. Built with Bubble Tea.",
    tags: ["Software", "Systems"] as const,
    status: "shipped" as const,
    href: "https://github.com/primatelabs/logprobe",
  },
  {
    title: "Neural Tile",
    description:
      "An experiment in procedural texture generation using small diffusion models running fully on-device. Generates seamless tileable textures from text prompts at 60fps on modern GPUs.",
    tags: ["AI", "Experiment"] as const,
    status: "archived" as const,
  },
  {
    title: "Printbed",
    description:
      "A parametric part library for 3D printing. Reusable components — cable clips, board mounts, enclosure panels, standoffs — built for remixing and designed to print without supports.",
    tags: ["Hardware"] as const,
    status: "active" as const,
    href: "https://github.com/primatelabs/printbed",
  },
];

const statusOrder = { active: 0, wip: 1, shipped: 2, archived: 3 };

const sortedProjects = [...projects].sort(
  (a, b) =>
    (statusOrder[a.status as keyof typeof statusOrder] ?? 4) -
    (statusOrder[b.status as keyof typeof statusOrder] ?? 4)
);

export default function ProjectsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12 border-b border-[#1a1a1a] pb-8">
        <p className="text-xs font-mono text-[#f97316] tracking-widest uppercase mb-3">
          Work
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-[#f5f5f5] mb-3">
          Projects
        </h1>
        <p className="text-[#737373] text-base max-w-lg leading-relaxed">
          A running list of things I&apos;ve built, am building, or have
          abandoned for something more interesting. Weighted toward AI systems,
          software tooling, and hardware experiments.
        </p>
      </div>

      {/* Status legend */}
      <div className="flex flex-wrap gap-x-5 gap-y-2 mb-10">
        {[
          { label: "active", desc: "actively maintained" },
          { label: "wip", desc: "work in progress" },
          { label: "shipped", desc: "done, stable" },
          { label: "archived", desc: "no longer maintained" },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-[#525252]">{s.label}</span>
            <span className="text-xs text-[#3a3a3a]">— {s.desc}</span>
          </div>
        ))}
      </div>

      {/* Projects grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#1a1a1a]">
        {sortedProjects.map((project) => (
          <div key={project.title} className="bg-[#0a0a0a]">
            <ProjectCard {...project} />
          </div>
        ))}
      </div>

      {/* Footer note */}
      <p className="mt-10 text-xs font-mono text-[#3a3a3a] text-center">
        More experiments live on{" "}
        <a
          href="https://github.com/primatelabs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#525252] hover:text-[#f97316] transition-colors"
        >
          GitHub
        </a>
      </p>
    </div>
  );
}
