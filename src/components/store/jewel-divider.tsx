import { cn } from "@/lib/utils";

/** Hairline divider with the central diamond motif. */
export function JewelDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4", className)} role="separator">
      <div className="h-px flex-1 bg-gold" />
      <div className="h-2 w-2 rotate-45 border border-gold" />
      <div className="h-3 w-3 rotate-45 bg-gold" />
      <div className="h-2 w-2 rotate-45 border border-gold" />
      <div className="h-px flex-1 bg-gold" />
    </div>
  );
}
