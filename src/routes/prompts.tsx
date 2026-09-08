import { createFileRoute, Link } from "@tanstack/react-router";
import { Quote } from "lucide-react";

import { AppShell, SectionCard } from "@/components/AppShell";
import { promptCollections, prompts } from "@/lib/journal-data";

export const Route = createFileRoute("/prompts")({
  head: () => ({
    meta: [
      { title: "Prompt library — Papertrail" },
      {
        name: "description",
        content:
          "Browse Papertrail's prompt collections: morning pages, gentle inventory, evening close and year in pages.",
      },
    ],
  }),
  component: PromptsPage,
});

function PromptsPage() {
  return (
    <AppShell eyebrow="PROMPT LIBRARY" title="Prompts">
      <div className="space-y-8">
        <SectionCard>
          <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-muted-foreground">
            TODAY'S PROMPT
          </p>
          <p className="mt-2 flex items-start gap-3 font-serif text-xl leading-snug text-foreground">
            <Quote className="mt-0.5 size-5 shrink-0 text-primary" />
            {prompts[0] ?? "What is asking for your attention today?"}
          </p>
        </SectionCard>

        {promptCollections.map((col) => (
          <SectionCard key={col.name}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="text-xl text-foreground">{col.name}</h3>
                <p className="mt-1 text-sm text-ink-soft">{col.blurb}</p>
              </div>
              <span className="text-xs text-muted-foreground">{col.count} prompts</span>
            </div>
            <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {col.prompts.map((p) => (
                <div
                  key={p}
                  className="flex items-start rounded-lg border border-border/70 bg-secondary/30 px-4 py-3 font-serif text-[1.05rem] leading-snug text-foreground"
                >
                  <Quote className="mt-0.5 mr-2 size-4 shrink-0 text-primary/70" />
                  {p}
                </div>
              ))}
            </div>
            <Link
              to="/today"
              className="mt-5 inline-flex items-center gap-1 text-sm text-ink-soft underline-grow"
            >
              Write with a prompt <span aria-hidden>→</span>
            </Link>
          </SectionCard>
        ))}
      </div>

      <aside>
        <SectionCard>
          <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-muted-foreground">
            A NOTE ON PROMPTS
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            A prompt is a doorway, not a test. Answer as far as you like. Each one lives in a
            collection meant to be opened slowly, over days or weeks.
          </p>
        </SectionCard>
      </aside>
    </AppShell>
  );
}
