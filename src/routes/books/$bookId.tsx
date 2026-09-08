import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { BookOpen, ArrowLeft } from "lucide-react";

import { AppShell, SectionCard } from "@/components/AppShell";
import { getBooks, type Book } from "@/lib/journal-data";

export const Route = createFileRoute("/books/$bookId")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.bookId.replace(/-/g, " ")} — Papertrail` },
      { name: "description", content: "Your reading notes and experience." },
    ],
  }),
  component: BookDetailPage,
});

function BookDetailPage() {
  const { bookId } = useParams({ from: "/books/$bookId" });
  const books = getBooks();

  const book = books.find((b: Book) => {
    const slug = b.bookName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    return slug === bookId;
  });

  if (!book) {
    return (
      <AppShell eyebrow="MY BOOK" title="Book not found">
        <SectionCard>
          <p className="text-sm text-ink-soft">
            This book does not exist in your journal.{" "}
            <Link to="/books" className="underline-grow text-foreground">
              Back to all books
            </Link>
          </p>
        </SectionCard>
      </AppShell>
    );
  }

  return (
    <AppShell eyebrow="MY BOOK" title={book.bookName}>
      <div className="space-y-6">
        <Link
          to="/books"
          className="inline-flex items-center gap-2 text-xs text-muted-foreground underline-grow"
        >
          <ArrowLeft className="size-3.5" /> Back to all books
        </Link>

        <SectionCard>
          <p className="text-xs text-muted-foreground">
            {new Date(book.date).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <div className="mt-6 space-y-6">
            <div>
              <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-muted-foreground">
                WHAT I LEARNED
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft whitespace-pre-wrap">
                {book.learnings || "No learnings recorded."}
              </p>
            </div>
            <div className="border-t border-border/70 pt-6">
              <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-muted-foreground">
                MY EXPERIENCE
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft whitespace-pre-wrap">
                {book.experience || "No experience recorded."}
              </p>
            </div>
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
