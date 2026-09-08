import { createFileRoute, Link } from "@tanstack/react-router";

import { AppShell, SectionCard } from "@/components/AppShell";
import { MoodDot } from "@/components/MoodDot";
import { Star } from "lucide-react";
import { entries } from "@/lib/journal-data";
import { getFavorites } from "@/lib/journal-data";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "Favorites — Papertrail" },
      { name: "description", content: "Your most meaningful pages, saved for later." },
    ],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const favIds = getFavorites();
  const favEntries = entries.filter((e) => favIds.includes(e.id));

  return (
    <AppShell eyebrow="FAVORITES" title="Saved pages">
      <div className="space-y-4">
        {favEntries.length === 0 ? (
          <SectionCard>
            <p className="text-sm text-ink-soft">
              No saved pages yet. Star entries from the entries list to find them here.
            </p>
          </SectionCard>
        ) : (
          favEntries.map((e, i) => (
            <Link
              key={e.id}
              to="/entries/$entryId"
              params={{ entryId: e.id }}
              className="stagger block rounded-xl border border-border/70 bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-green"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <span className="flex items-center gap-2 text-xs text-muted-foreground">
                <MoodDot mood={e.mood} />
                {e.displayDate}
                <span aria-hidden>•</span>
                <span>{e.words} words</span>
              </span>
              <h3 className="mt-2 text-2xl text-foreground">{e.title}</h3>
              <p className="mt-1 text-sm text-ink-soft">{e.excerpt}</p>
              <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="size-3.5 fill-current text-clay" /> Saved
              </div>
            </Link>
          ))
        )}
      </div>
    </AppShell>
  );
}
