import { createFileRoute, Link } from "@tanstack/react-router";
import { Tag } from "lucide-react";

import { AppShell, SectionCard } from "@/components/AppShell";
import { getTagCounts } from "@/lib/journal-data";

export const Route = createFileRoute("/tags")({
  head: () => ({
    meta: [
      { title: "Tags — Papertrail" },
      { name: "description", content: "All your tags, organized by usage." },
    ],
  }),
  component: TagsPage,
});

function TagsPage() {
  const tags = getTagCounts();

  return (
    <AppShell eyebrow="TAGS" title="Your tags">
      <div className="space-y-5">
        <SectionCard>
          <p className="text-sm text-ink-soft">
            Every tag you have used across your journal, sorted by frequency.
          </p>
        </SectionCard>

        {tags.length === 0 ? (
          <SectionCard>
            <p className="text-sm text-ink-soft">
              {" "}
              No tags yet. Start writing to build your tag cloud.
            </p>
          </SectionCard>
        ) : (
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <Link
                key={t.name}
                to="/entries"
                className="stagger inline-flex items-center gap-2 rounded-xl border border-border/70 bg-card px-4 py-3 transition-all duration-200 hover:shadow-green"
              >
                <Tag className="size-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{t.name}</span>
                <span className="text-xs text-muted-foreground">{t.count}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
