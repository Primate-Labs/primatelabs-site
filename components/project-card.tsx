import Link from "next/link";

type Tag = "AI" | "Software" | "Hardware" | "Experiment" | "Systems";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: readonly Tag[] | Tag[];
  href?: string;
  status?: "active" | "shipped" | "archived" | "wip";
}

const tagColors: Record<Tag, string> = {
  AI: "text-[#f97316] border-[#f97316]/30 bg-[#f97316]/5",
  Software: "text-[#a3a3a3] border-[#525252]/40 bg-[#525252]/10",
  Hardware: "text-[#60a5fa] border-[#60a5fa]/30 bg-[#60a5fa]/5",
  Experiment: "text-[#c084fc] border-[#c084fc]/30 bg-[#c084fc]/5",
  Systems: "text-[#34d399] border-[#34d399]/30 bg-[#34d399]/5",
};

const statusLabels: Record<string, string> = {
  active: "active",
  shipped: "shipped",
  archived: "archived",
  wip: "wip",
};

export default function ProjectCard({
  title,
  description,
  tags,
  href,
  status,
}: ProjectCardProps) {
  const content = (
    <div className="group border border-[#1a1a1a] bg-[#111111] hover:border-[#2a2a2a] hover:bg-[#141414] transition-all duration-200 p-6 h-full">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-[#f5f5f5] font-semibold text-base group-hover:text-white transition-colors tracking-tight">
          {title}
        </h3>
        {status && (
          <span className="text-[#525252] font-mono text-xs ml-3 flex-shrink-0 mt-0.5">
            {statusLabels[status]}
          </span>
        )}
      </div>

      <p className="text-[#737373] text-sm leading-relaxed mb-4">
        {description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`text-xs font-mono border px-2 py-0.5 ${tagColors[tag]}`}
          >
            {tag}
          </span>
        ))}
      </div>

    </div>
  );

  if (href) {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    );
  }

  return <div className="h-full">{content}</div>;
}
