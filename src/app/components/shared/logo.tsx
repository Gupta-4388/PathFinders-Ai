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
          <circle cx="50" cy="50" r="45" fill="none" stroke="#f97316" strokeWidth="5" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="#2563eb" strokeWidth="5" />
          <path 
            d="M 50,95 
               C 50,95 20,75 30,50 
               S 45,20 50,10 
               s 20,40 20,40 
               c 0,0 -10,25 -20,45 z" 
            fill="#333" 
            transform="scale(1, 0.9) translate(0, 5)"
          />
          <path 
            d="M 50,85 
               C 50,85 40,70 45,50 
               S 48,30 50,20 
               s 5,20 5,30 
               c 0,0 -5,15 -5,35 z" 
            fill="none" 
            stroke="white" 
            strokeWidth="1.5" 
            strokeDasharray="5, 3" 
            transform="scale(1, 0.9) translate(0, 5)"
          />
        </g>
      </svg>
      <span className="font-headline text-xl font-semibold text-foreground">
        PathFinder AI
      </span>
    </div>
  );
}
