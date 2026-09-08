import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Flame, Save } from "lucide-react";

import { AppShell, SectionCard } from "@/components/AppShell";
import { Logo } from "@/components/Logo";
import { MoodDot } from "@/components/MoodDot";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { moods, type MoodKey, prompts, user } from "@/lib/journal-data";

export const Route = createFileRoute("/today")({
  head: () => ({
    meta: [
      { title: "Today — Papertrail" },
      {
        name: "description",
        content: "Today's writing prompt. One page, one honest word for how the day felt.",
      },
    ],
  }),
  component: TodayPage,
});

function TodayPage() {
  const [text, setText] = useState("");
  const [mood, setMood] = useState<MoodKey>("quiet");

  const trimmed = text.trim();
  const words = trimmed === "" ? 0 : trimmed.split(/\s+/).length;
  const prompt = prompts[0] ?? "What is asking for your attention today?";

  const handleSave = () => {
    const page = { prompt, body: text, mood, words };
    window.localStorage.setItem("papertrail.today", JSON.stringify(page));
    toast.success("Page saved to your journal");
  };

  return (
    <AppShell
      eyebrow="TODAY"
      title="May 23, 2024"
      aside={
        <div className="space-y-6">
          <SectionCard>
            <div className="flex items-center gap-3">
              <Flame className="size-5 text-clay" />
              <div>
                <p className="text-sm font-semibold">{user.streak} day streak</p>
                <p className="text-xs text-muted-foreground">Keep the thread going</p>
              </div>
            </div>
          </SectionCard>
          <SectionCard>
            <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-muted-foreground">
              YOUR MOOD
            </p>
            <span className="mt-3 flex items-center gap-2 text-sm">
              <MoodDot mood={mood} /> {mood === "quiet" ? "Quiet" : mood}
            </span>
          </SectionCard>
          <SectionCard>
            <p className="text-xs text-muted-foreground">
              Tips: write for two minutes. Three sentences still counts. Come back tomorrow.
            </p>
          </SectionCard>
          <Logo showWord={false} className="justify-center pt-4" />
        </div>
      }
    >
      <div className="space-y-8">
        <SectionCard>
          <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-muted-foreground">
            TODAY'S PROMPT
          </p>
          <p className="mt-2 font-serif text-2xl leading-snug text-foreground">{prompt}</p>
        </SectionCard>

        <SectionCard className="shadow-paper">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Begin anywhere… a single sentence is enough."
            className="min-h-[280px] resize-none border-0 bg-transparent font-serif text-[1.05rem] leading-[1.6] text-ink-soft outline-none placeholder:text-ink-soft/40 focus:ring-0"
            rows={11}
          />
          <div className="mt-4 flex items-center justify-between border-t border-rule pt-4">
            <span className="text-xs text-muted-foreground">{words} words</span>
            <Button variant="ghost" size="sm" onClick={handleSave}>
              <Save className="mr-2 size-4" /> Save page
            </Button>
          </div>
        </SectionCard>

        <SectionCard>
          <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-muted-foreground">
            HOW TODAY FEELS
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {moods.map((m) => (
              <button
                key={m.key}
                type="button"
                onClick={() => setMood(m.key)}
                className={cn(
                  "flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-colors",
                  mood === m.key
                    ? "border-primary bg-accent text-foreground"
                    : "border-border/70 text-ink-soft hover:bg-accent",
                )}
              >
                <MoodDot mood={m.key} />
                {m.label}
              </button>
            ))}
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
