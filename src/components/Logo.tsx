import { Leaf } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className, showWord = true }: { className?: string; showWord?: boolean }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Leaf className="size-4" />
      </span>
      {showWord && (
        <span className="font-serif text-2xl tracking-tight text-foreground">papertrail</span>
      )}
    </span>
  );
}
