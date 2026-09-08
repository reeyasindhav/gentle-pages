import { createFileRoute, Link } from "@tanstack/react-router";
import { Flame, PenLine, TrendingUp, BookOpen } from "lucide-react";

import { AppShell, SectionCard } from "@/components/AppShell";
import { entries, getStats } from "@/lib/journal-data";

export const Route = createFileRoute("/stats")({
  head: () => ({
    meta: [
      { title: "Stats — Papertrail" },
      { name: "description", content: "Your writing rhythm and reading patterns." },
    ],
  }),
  component: StatsPage,
});

function StatsPage() {
  const stats = getStats();

  return (
    <AppShell eyebrow="STATS" title="Your year in numbers">
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard icon={PenLine} label="Pages written" value={stats.totalEntries.toString()} />
          <StatCard
            icon={TrendingUp}
            label="Total words"
            value={stats.totalWords.toLocaleString()}
          />
          <StatCard icon={Flame} label="Best streak" value={`${stats.streak} days`} />
          <StatCard icon={BookOpen} label="This month" value={`${stats.thisMonth} pages`} />
        </div>

        {stats.longestEntry && (
          <SectionCard>
            <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-muted-foreground">
              LONGEST ENTRY
            </p>
            <Link
              to="/entries/$entryId"
              params={{ entryId: stats.longestEntry.id }}
              className="mt-3 block"
            >
              <h3 className="text-xl text-foreground">{stats.longestEntry.title}</h3>
              <p className="mt-1 text-sm text-ink-soft">{stats.longestEntry.excerpt}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                {stats.longestEntry.words} words · {stats.longestEntry.displayDate}
              </p>
            </Link>
          </SectionCard>
        )}

        <SectionCard>
          <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-muted-foreground">
            TOP MOOD
          </p>
          <p className="mt-2 text-2xl font-serif capitalize text-foreground">{stats.topMood}</p>
          <p className="mt-1 text-sm text-ink-soft">The mood you write in most often.</p>
        </SectionCard>

        <SectionCard>
          <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-muted-foreground">
            AVERAGE PAGE
          </p>
          <p className="mt-2 text-2xl font-serif text-foreground">{stats.avgWords} words</p>
          <p className="mt-1 text-sm text-ink-soft">
            About {Math.round(stats.avgWords / 150)} minute read per page.
          </p>
        </SectionCard>
      </div>
    </AppShell>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border/70 bg-card p-4 shadow-paper">
      <Icon className="size-5 text-primary" />
      <p className="mt-3 text-2xl font-serif text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
