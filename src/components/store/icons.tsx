import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

export function BagIcon({ size = 21, ...p }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 21 21" fill="none" stroke="currentColor" strokeWidth={1.2} aria-hidden {...p}>
      <path d="M3 6h15l-1 13H4z" />
      <path d="M7.5 6a3 3 0 016 0" />
    </svg>
  );
}

export function UserIcon({ size = 18, ...p }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth={1.2} aria-hidden {...p}>
      <circle cx="9" cy="6" r="3.5" />
      <path d="M2.5 17c1-3.5 3.5-5 6.5-5s5.5 1.5 6.5 5" />
    </svg>
  );
}

export function SearchIcon({ size = 18, ...p }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth={1.2} aria-hidden {...p}>
      <circle cx="8" cy="8" r="6" />
      <path d="M12.5 12.5L17 17" />
    </svg>
  );
}

export function MenuIcon({ size = 18, ...p }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth={1.2} aria-hidden {...p}>
      <path d="M2 5h14M2 9h14M2 13h14" />
    </svg>
  );
}

export function PersonPlaceholder({ size = 40, ...p }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={1} aria-hidden {...p}>
      <circle cx="20" cy="14" r="7" />
      <path d="M6 36c2-8 7-12 14-12s12 4 14 12" />
    </svg>
  );
}

/** The gold lozenge used as the wishlist mark. */
export function Diamond({ filled, className = "" }: { filled?: boolean; className?: string }) {
  return (
    <span className={`grid h-7 w-7 rotate-45 place-items-center border border-gold ${className}`} aria-hidden>
      <span className={`h-2 w-2 ${filled ? "bg-gold" : "border border-gold"}`} />
    </span>
  );
}
