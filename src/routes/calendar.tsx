import { createFileRoute, Link } from "@tanstack/react-router";
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { AppShell, SectionCard } from "@/components/AppShell";
import { MoodDot } from "@/components/MoodDot";
import { entries, mayEntryDays, type MoodKey, moodLabel } from "@/lib/journal-data";

export const Route = createFileRoute("/calendar")({
  head: () => ({
    meta: [
      { title: "Calendar — Papertrail" },
      {
        name: "description",
        content: "A monthly view of your trail. Tap a marked day to reread the page.",
      },
    ],
  }),
  component: CalendarPage,
});

const MONTH_START = "2024-05-01T00:00:00";

function CalendarPage() {
  const base = new Date(MONTH_START);
  const days = buildCalendarDays(base);
  const firstMayIndex = days.findIndex(
    (d) => Number(format(d, "d")) === 1 && format(d, "M") === "5",
  );
  const startIndex = firstMayIndex === -1 ? 0 : firstMayIndex;

  return (
    <AppShell eyebrow="YOUR TRAIL" title="Calendar">
      <div className="space-y-8">
        <SectionCard>
          <div className="flex items-center justify-between">
            <button
              type="button"
              aria-label="Previous month"
              className="inline-flex size-8 items-center justify-center rounded-lg border border-border/70 text-sm text-ink-soft hover:bg-accent"
            >
              <ChevronLeft className="size-4" />
            </button>
            <p className="text-sm font-semibold text-foreground">
              {capitalize(format(base, "MMMM yyyy"))}
            </p>
            <button
              type="button"
              aria-label="Next month"
              className="inline-flex size-8 items-center justify-center rounded-lg border border-border/70 text-sm text-ink-soft hover:bg-accent"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
          <div className="mt-4 grid grid-cols-7 gap-1 text-xs text-muted-foreground">
            {WEEKDAYS.map((d) => (
              <div key={d} className="text-center font-medium uppercase">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((d, i) => {
              const inMonth = i >= startIndex;
              const dayNum = Number(format(d, "d"));
              return (
                <CalendarDay
                  key={format(d, "yyyy-MM-dd")}
                  dayNum={dayNum}
                  inMonth={inMonth}
                  entry={inMonth ? lookupEntry(dayNum) : undefined}
                />
              );
            })}
          </div>
        </SectionCard>
      </div>

      <aside>
        <SectionCard>
          <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-muted-foreground">
            PAGES THIS MONTH
          </p>
          <p className="mt-2 text-sm text-ink-soft">7 pages, 12 writing days, a quiet month.</p>
          <div className="mt-4 space-y-1.5">
            {entries.map((e) => (
              <Link
                key={e.id}
                to="/entries/$entryId"
                params={{ entryId: e.id }}
                className="flex items-center gap-2 text-sm text-ink-soft underline-grow"
              >
                <MoodDot mood={e.mood} />
                <span>{e.displayDate}</span>
                <span className="ml-auto text-xs">{e.title}</span>
              </Link>
            ))}
          </div>
        </SectionCard>
      </aside>
    </AppShell>
  );
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type CalendarEntry = { id: string; title: string; mood: MoodKey };

function lookupEntry(dayNum: number): CalendarEntry | undefined {
  const id = mayEntryDays[dayNum];
  if (id == null) return undefined;
  const entry = entries.find((e) => e.id === id);
  if (entry == null) return undefined;
  return { id: entry.id, title: entry.title, mood: entry.mood };
}

function CalendarDay({
  dayNum,
  inMonth,
  entry,
}: {
  dayNum: number;
  inMonth: boolean;
  entry: CalendarEntry | undefined;
}) {
  const cell = (
    <div
      className={
        entry
          ? "relative flex h-full w-full items-center justify-center rounded-lg border border-border/70 bg-accent/60"
          : "flex h-full w-full items-center justify-center rounded-lg border border-transparent"
      }
    >
      <span>{dayNum}</span>
      {entry && (
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2">
          <MoodDot mood={entry.mood} className="size-1.5" />
        </span>
      )}
    </div>
  );

  if (!inMonth) {
    return (
      <div className="aspect-square w-full cursor-default rounded-lg p-1.5 text-center text-sm font-medium text-muted-foreground/40">
        {cell}
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="aspect-square w-full cursor-default rounded-lg p-1.5 text-center text-sm font-medium text-foreground">
        {cell}
      </div>
    );
  }

  return (
    <Link
      to="/entries/$entryId"
      params={{ entryId: entry.id }}
      className="aspect-square w-full cursor-pointer rounded-lg p-1.5 text-center text-sm font-medium text-foreground transition-colors hover:bg-accent"
    >
      {cell}
    </Link>
  );
}

function buildCalendarDays(date: Date): Date[] {
  const start = startOfWeek(startOfMonth(date));
  const end = endOfWeek(endOfMonth(date));
  return eachDayOfInterval({ start, end });
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
