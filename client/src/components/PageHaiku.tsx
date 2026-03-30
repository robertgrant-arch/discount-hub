/**
 * PageHaiku — Tasteful decorative haiku element for each page
 * Design: Warm Abundance — terracotta/cream/forest green
 * Displays a Claude-generated haiku related to senior/disability themes
 */

interface PageHaikuProps {
  lines: [string, string, string];
  className?: string;
}

export default function PageHaiku({ lines, className = "" }: PageHaikuProps) {
  return (
    <figure
      className={`my-8 mx-auto max-w-sm ${className}`}
      aria-label="Decorative haiku"
    >
      <blockquote className="relative border-l-4 border-[#C17A4A] pl-5 py-2">
        <div className="absolute -left-1 top-0 w-2 h-2 rounded-full bg-[#C17A4A] opacity-80" />
        <div className="absolute -left-1 bottom-0 w-2 h-2 rounded-full bg-[#C17A4A] opacity-80" />
        <p className="font-['Playfair_Display'] italic text-sm leading-7 text-current opacity-80 space-y-0.5">
          {lines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </p>
      </blockquote>
      <figcaption className="mt-2 pl-5 text-xs text-current opacity-50 tracking-widest uppercase">
        — HealthCare Select Benefits Hub
      </figcaption>
    </figure>
  );
}
