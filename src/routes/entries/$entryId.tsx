import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { AppShell, SectionCard } from "@/components/AppShell";
import { Logo } from "@/components/Logo";
import { MoodDot } from "@/components/MoodDot";
import { entries, moodLabel } from "@/lib/journal-data";

export const Route = createFileRoute("/entries/$entryId")({
  head: () => ({
    meta: [
      { title: "Entry — Papertrail" },
      {
        name: "description",
        content: "A page from your journal, kept exactly as you left it.",
      },
    ],
  }),
  component: EntryPage,
});

function EntryPage() {
  const { entryId } = Route.useParams();
  const entry = entries.find((e) => e.id === entryId);

  if (!entry) {
    return (
      <AppShell eyebrow="A BLANK PAGE" title="Nothing written here">
        <SectionCard className="py-12 text-center">
          <p className="text-sm text-ink-soft">This page doesn't exist in your trail.</p>
          <Link
            to="/entries"
            className="mt-4 inline-flex items-center gap-1 text-sm text-foreground underline-grow"
          >
            <ArrowLeft className="size-3" /> Back to entries
          </Link>
        </SectionCard>
      </AppShell>
    );
  }

  return (
    <AppShell
      eyebrow="YOUR TRAIL"
      title={entry.title}
      aside={
        <div className="space-y-6">
          <SectionCard>
            <p className="text-xs text-muted-foreground">Mood</p>
            <span className="mt-2 flex items-center gap-2 text-sm">
              <MoodDot mood={entry.mood} /> {moodLabel(entry.mood)}
            </span>
          </SectionCard>
          <SectionCard>
            <p className="text-xs text-muted-foreground">Details</p>
            <ul className="mt-2 space-y-1 text-sm text-ink-soft">
              <li>{entry.displayDate}</li>
              <li>{entry.words} words</li>
              {entry.tags.map((t) => (
                <li key={t}>#{t}</li>
              ))}
            </ul>
          </SectionCard>
          <Logo showWord={false} className="justify-center pt-4" />
        </div>
      }
    >
      <div className="space-y-8">
        <Link
          to="/entries"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground underline-grow"
        >
          <ArrowLeft className="size-3" /> Back to all entries
        </Link>

        <SectionCard className="shadow-paper">
          <p className="text-xs text-muted-foreground">{entry.displayDate} · Morning pages</p>
          <h2 className="mt-2 font-serif text-3xl text-foreground">{entry.title}</h2>
          <div className="ruled-lines mt-6 font-serif text-[1.05rem] text-ink-soft">
            {entry.body.map((p) => (
              <p key={p} className="mb-4">
                {p}
              </p>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-rule pt-4 text-xs text-muted-foreground">
            <span>{entry.words} words</span>
            <span className="flex items-center gap-2">
              <MoodDot mood={entry.mood} /> {moodLabel(entry.mood)}
            </span>
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
