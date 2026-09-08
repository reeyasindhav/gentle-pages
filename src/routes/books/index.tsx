import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";

import { AppShell, SectionCard } from "@/components/AppShell";
import { getBooks, type Book } from "@/lib/journal-data";

export const Route = createFileRoute("/books/")({
  head: () => ({
    meta: [
      { title: "My Book — Papertrail" },
      { name: "description", content: "Your reading journal. Books, learnings, and experiences." },
    ],
  }),
  component: BooksPage,
});

function BooksPage() {
  const books = getBooks();

  return (
    <AppShell eyebrow="MY BOOK" title="Reading journal">
      <div className="space-y-4">
        {books.length === 0 ? (
          <SectionCard>
            <p className="text-sm text-ink-soft">
              No books added yet. Go to Entries and click "Add book" to start your reading journal.
            </p>
          </SectionCard>
        ) : (
          books.map((b: Book, i: number) => (
            <Link
              key={b.date + b.bookName}
              to="/books/$bookId"
              params={{ bookId: b.bookName.toLowerCase().replace(/[^a-z0-9]+/g, "-") }}
              className="stagger block rounded-xl border border-border/70 bg-card p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-green"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <span className="flex items-center gap-2 text-xs text-muted-foreground">
                <BookOpen className="size-3.5" />
                {new Date(b.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <h3 className="mt-2 text-2xl text-foreground">{b.bookName}</h3>
              {b.learnings && (
                <p className="mt-1 text-sm text-ink-soft line-clamp-2">{b.learnings}</p>
              )}
            </Link>
          ))
        )}
      </div>
    </AppShell>
  );
}
