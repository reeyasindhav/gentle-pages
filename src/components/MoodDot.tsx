import { moodColor, type MoodKey } from "@/lib/journal-data";
import { cn } from "@/lib/utils";

export function MoodDot({ mood, className }: { mood: MoodKey; className?: string }) {
  return (
    <span
      className={cn("inline-block size-2 shrink-0 rounded-full", className)}
      style={{ backgroundColor: moodColor(mood) }}
      aria-hidden
    />
  );
}
