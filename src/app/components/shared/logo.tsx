import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <path d="M14 25.6667C20.4434 25.6667 25.6667 20.4434 25.6667 14C25.6667 7.55666 20.4434 2.33334 14 2.33334C7.55666 2.33334 2.33334 7.55666 2.33334 14C2.33334 20.4434 7.55666 25.6667 14 25.6667Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="font-headline text-xl font-semibold text-foreground">
        PathFinder AI
      </span>
    </div>
  );
}
