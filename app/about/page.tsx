import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Primate Labs — a builder's lab at the intersection of software, AI, and hardware.",
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="mb-12 border-b border-[#1a1a1a] pb-8">
        <p className="text-xs font-mono text-[#f97316] tracking-widest uppercase mb-3">
          About
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-[#f5f5f5]">
          Primate Labs
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Bio */}
          <section>
            <h2 className="text-xs font-mono text-[#525252] tracking-widest uppercase mb-4">
              Background
            </h2>
            <div className="space-y-4 text-[#a3a3a3] leading-relaxed">
              <p>
                I&apos;m a software engineer and builder with a background in
                distributed systems and a compulsion to take on projects that sit
                at the edge of what&apos;s practically achievable. I care about
                the craft — not just the outcome, but how things are made, what
                tradeoffs were made, and whether the design holds under
                pressure.
              </p>
              <p>
                Most of my career has been spent building backend infrastructure
                and data systems for companies at different scales. I&apos;ve
                worked on things that needed to be reliable at millions of
                requests per second, and on things that needed to ship on a
                Tuesday regardless of elegance.
              </p>
              <p>
                In recent years, I&apos;ve gotten increasingly interested in
                the intersection of AI and real-world systems — not the demo
                layer, but the part where you have to actually make probabilistic
                outputs fit into deterministic software. That problem space has
                a lot of interesting engineering left in it.
              </p>
            </div>
          </section>

          <hr className="border-[#1a1a1a]" />

          {/* What Primate Labs is */}
          <section>
            <h2 className="text-xs font-mono text-[#525252] tracking-widest uppercase mb-4">
              What This Is
            </h2>
            <div className="space-y-4 text-[#a3a3a3] leading-relaxed">
              <p>
                Primate Labs is the umbrella for my independent work — open
                source projects, consulting engagements, hardware experiments,
                and writing. It&apos;s not a company in the traditional sense.
                It&apos;s a place to build things seriously without the
                constraints of a product roadmap.
              </p>
              <p>
                The projects that come out of here tend to be tools I wanted to
                exist and had to build myself, or explorations into technical
                areas I needed to understand deeply. Some ship. Some don&apos;t.
                All of them teach something.
              </p>
            </div>
          </section>

          <hr className="border-[#1a1a1a]" />

          {/* Current focus */}
          <section>
            <h2 className="text-xs font-mono text-[#525252] tracking-widest uppercase mb-4">
              Current Focus
            </h2>
            <ul className="space-y-3">
              {[
                "LLM orchestration and inference optimization at the infrastructure layer",
                "Tooling for AI system evaluation and observability",
                "3D-printed hardware for motion control and robotics",
                "Writing about the systems engineering challenges in AI products",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-[#f97316] mt-1.5 flex-shrink-0">
                    <svg width="6" height="6" viewBox="0 0 6 6" fill="currentColor">
                      <rect width="6" height="6" />
                    </svg>
                  </span>
                  <span className="text-[#a3a3a3] leading-relaxed text-sm">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <hr className="border-[#1a1a1a]" />

          {/* Contact */}
          <section>
            <h2 className="text-xs font-mono text-[#525252] tracking-widest uppercase mb-4">
              Connect
            </h2>
            <div className="space-y-3 text-[#a3a3a3] text-sm leading-relaxed">
              <p>
                I&apos;m occasionally available for consulting work on
                distributed systems, AI infrastructure, and technical
                architecture. I prefer problems where the technical challenge is
                the interesting part.
              </p>
              <p>
                The best way to reach me is email. If you&apos;re working on
                something interesting or want to talk about any of the projects
                here, I&apos;m genuinely interested.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="mailto:hello@primatelabs.io"
                className="inline-flex items-center gap-2 border border-[#2a2a2a] text-[#a3a3a3] text-xs font-mono px-4 py-2 hover:border-[#f97316] hover:text-[#f97316] transition-colors"
              >
                hello@primatelabs.io
              </a>
              <a
                href="https://github.com/primatelabs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#2a2a2a] text-[#a3a3a3] text-xs font-mono px-4 py-2 hover:border-[#3a3a3a] hover:text-[#f5f5f5] transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://x.com/primatelabs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-[#2a2a2a] text-[#a3a3a3] text-xs font-mono px-4 py-2 hover:border-[#3a3a3a] hover:text-[#f5f5f5] transition-colors"
              >
                X / Twitter
              </a>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Stack */}
          <div className="border border-[#1a1a1a] bg-[#111111] p-5">
            <h3 className="text-xs font-mono text-[#525252] tracking-widest uppercase mb-4">
              Tools & Stack
            </h3>
            <div className="space-y-1">
              {[
                { category: "Languages", items: "Go, TypeScript, Python" },
                { category: "Systems", items: "Postgres, Redis, Kafka" },
                { category: "Cloud", items: "AWS, Fly.io" },
                { category: "AI", items: "OpenAI, Anthropic, vLLM" },
                { category: "Hardware", items: "STM32, Raspberry Pi" },
                { category: "CAD", items: "Fusion 360, OpenSCAD" },
              ].map((row) => (
                <div
                  key={row.category}
                  className="flex items-baseline gap-2 py-1.5 border-b border-[#1a1a1a] last:border-b-0"
                >
                  <span className="text-xs font-mono text-[#525252] w-20 flex-shrink-0">
                    {row.category}
                  </span>
                  <span className="text-xs text-[#737373]">{row.items}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="border border-[#1a1a1a] bg-[#111111] p-5">
            <h3 className="text-xs font-mono text-[#525252] tracking-widest uppercase mb-4">
              Interests
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {[
                "distributed systems",
                "LLM inference",
                "hardware-software co-design",
                "developer tooling",
                "generative models",
                "robotics",
                "material science",
                "technical writing",
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono border border-[#222] text-[#525252] px-2 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
