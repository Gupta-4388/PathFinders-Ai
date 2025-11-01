import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <circle cx="50" cy="50" r="45" fill="#2563eb" />
          <path
            d="M 30 70 Q 50 50, 70 30"
            stroke="#f97316"
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
          />
           <path
            d="M 30 70 Q 50 50, 70 30"
            stroke="white"
            strokeWidth="3"
            strokeDasharray="5 5"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>
      <span className="font-headline text-xl font-semibold text-foreground">
        PathFinder AI
      </span>
    </div>
  );
}
