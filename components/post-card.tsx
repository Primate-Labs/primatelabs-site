import Link from "next/link";

interface PostCardProps {
  title: string;
  description: string;
  date: string;
  slug: string;
  readingTime?: string;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function PostCard({
  title,
  description,
  date,
  slug,
  readingTime,
}: PostCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="border-b border-[#1a1a1a] py-6 last:border-b-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-[#f5f5f5] font-semibold text-base tracking-tight group-hover:text-white transition-colors mb-1.5">
              {title}
              <span className="inline-block ml-2 text-[#525252] group-hover:text-[#f97316] transition-colors">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="inline group-hover:translate-x-0.5 transition-transform"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </h2>
            <p className="text-[#737373] text-sm leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>

          <div className="flex-shrink-0 text-right">
            <time
              dateTime={date}
              className="text-xs font-mono text-[#525252] block"
            >
              {formatDate(date)}
            </time>
            {readingTime && (
              <span className="text-xs font-mono text-[#3a3a3a] block mt-0.5">
                {readingTime}
              </span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
