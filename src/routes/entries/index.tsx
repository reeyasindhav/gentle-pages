import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { AppShell, SectionCard } from "@/components/AppShell";
import { AddBookDialog } from "@/components/AddBookDialog";
import { MoodDot } from "@/components/MoodDot";
import { BookOpen, Star } from "lucide-react";
import { entries } from "@/lib/journal-data";
import { getFavorites, toggleFavorite } from "@/lib/journal-data";

export const Route = createFileRoute("/entries/")({
  head: () => ({
    meta: [
      { title: "Entries — Papertrail" },
      {
        name: "description",
        content: "Your trail of pages, newest first. Tap any entry to reread it.",
      },
    ],
  }),
  component: EntriesIndexPage,
});

function EntriesIndexPage() {
  const [bookOpen, setBookOpen] = useState(false);
  const favIds = getFavorites();

  return (
    <AppShell eyebrow="YOUR TRAIL" title="Entries">
      <div className="space-y-5">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setBookOpen(true)}
            className="flex items-center gap-2 rounded-lg border border-primary/15 bg-accent px-3 py-2 text-xs font-medium text-accent-foreground transition-all duration-200 hover:border-primary/35 hover:shadow-green"
            title="Add a book"
          >
            <BookOpen className="size-3.5" />
            Add book
          </button>
        </div>
        {entries.length === 0 ? (
          <SectionCard>
            <p className="text-sm text-ink-soft">No pages written yet.</p>
          </SectionCard>
        ) : (
          entries.map((e) => {
            const isFav = favIds.includes(e.id);
            return (
              <div key={e.id} className="relative">
                <Link
                  to="/entries/$entryId"
                  params={{ entryId: e.id }}
                  className="stagger block rounded-xl border border-border/70 bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-green"
                  style={{ animationDelay: `${entries.indexOf(e) * 70}ms` }}
                >
                  <span className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MoodDot mood={e.mood} />
                    {e.displayDate}
                    <span aria-hidden>•</span>
                    <span>{e.words} words</span>
                  </span>
                  <h3 className="mt-2 text-2xl text-foreground">{e.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{e.excerpt}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {e.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-border/70 bg-secondary/40 px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={(ev) => {
                    ev.preventDefault();
                    toggleFavorite(e.id);
                  }}
                  className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full bg-card/80 text-muted-foreground transition-colors hover:bg-card hover:text-clay"
                  title={isFav ? "Remove from favorites" : "Add to favorites"}
                >
                  <Star className={`size-4 ${isFav ? "fill-current text-clay" : ""}`} />
                </button>
              </div>
            );
          })
        )}
      </div>
      <AddBookDialog open={bookOpen} onOpenChange={setBookOpen} />
    </AppShell>
  );
}
