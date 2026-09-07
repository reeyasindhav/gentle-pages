import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Flame, Quote, Sparkles, Tag } from "lucide-react";
import { Logo } from "@/components/Logo";
import { MoodDot } from "@/components/MoodDot";
import { entries, moods, prompts } from "@/lib/journal-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Papertrail — Journaling & daily writing, without the blank-page dread" },
      {
        name: "description",
        content:
          "A paper-quiet journal with daily prompt cards, mood tagging, a calendar view and a yearly reflection summary. Start a page in under a minute.",
      },
      {
        property: "og:title",
        content: "Papertrail — Journaling & daily writing, without the blank-page dread",
      },
      {
        property: "og:description",
        content:
          "Daily prompt cards, mood tagging, calendar view and yearly reflection in one calm space.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: Quote,
    title: "Daily prompt cards",
    body: "A single question, waiting where the blank page used to be. Shuffle it until one catches.",
  },
  {
    icon: Tag,
    title: "Mood tagging",
    body: "Five honest words instead of a five-star scale. Your moods become a readable pattern.",
  },
  {
    icon: CalendarDays,
    title: "Calendar view",
    body: "Your year as a field of small marks. Tap any day to reread what you were thinking.",
  },
  {
    icon: Sparkles,
    title: "Yearly reflection",
    body: "Pages written, writing rhythm, and the words you kept returning to — gathered for you.",
  },
];

function Landing() {
  return (
    <div className="paper-grain min-h-screen bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-7">
        <Logo />
        <nav className="flex items-center gap-6 text-sm">
          <Link to="/prompts" className="underline-grow hidden text-ink-soft sm:inline">
            Prompts
          </Link>
          <Link to="/login" className="underline-grow text-ink-soft">
            Sign in
          </Link>
          <Link
            to="/signup"
            className="rounded-lg bg-primary px-4 py-2.5 font-medium text-primary-foreground transition-all duration-300 hover:shadow-lift"
          >
            Start writing
          </Link>
        </nav>
      </header>

      <section className="mx-auto max-w-6xl px-6 pt-16 pb-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="stagger text-[0.68rem] font-semibold tracking-[0.18em] text-muted-foreground">
              A JOURNAL THAT DOESN'T RUSH YOU
            </p>
            <h1 className="mt-5 animate-ink text-6xl leading-[1.02] sm:text-7xl">
              Small pages
              <br />
              become a life.
            </h1>
            <p
              className="stagger mt-7 max-w-lg text-lg leading-relaxed text-ink-soft"
              style={{ animationDelay: "120ms" }}
            >
              Papertrail is a distraction-free writing room: one prompt, one page, one honest word
              for how the day felt. Come back tomorrow and the trail starts to show.
            </p>
            <div
              className="stagger mt-9 flex flex-wrap items-center gap-4"
              style={{ animationDelay: "220ms" }}
            >
              <Link
                to="/signup"
                className="group flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-medium text-primary-foreground transition-all duration-300 hover:shadow-lift"
              >
                Begin your first page
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link to="/today" className="underline-grow text-sm text-ink-soft">
                See a day inside Papertrail
              </Link>
            </div>
            <div
              className="stagger mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
              style={{ animationDelay: "320ms" }}
            >
              {moods.map((m) => (
                <span key={m.key} className="flex items-center gap-2">
                  <MoodDot mood={m.key} />
                  {m.label}
                </span>
              ))}
            </div>
          </div>

          <div className="stagger relative" style={{ animationDelay: "180ms" }}>
            <div className="absolute -top-5 -right-3 hidden w-56 rotate-3 rounded-xl border border-border/70 bg-accent p-5 shadow-paper sm:block">
              <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-muted-foreground">
                TODAY'S PROMPT
              </p>
              <p className="mt-2 font-serif text-xl leading-snug">{prompts[0]}</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-card p-8 shadow-lift">
              <p className="text-xs text-muted-foreground">May 17, 2024 · Morning pages</p>
              <h2 className="mt-2 text-3xl">A slower kind of morning</h2>
              <div className="ruled-lines mt-5 font-serif text-[1.05rem] text-ink-soft">
                {entries[0].body.map((p) => (
                  <p key={p} className="mb-4">
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-rule pt-4 text-xs text-muted-foreground">
                <span>74 words</span>
                <span className="flex items-center gap-2">
                  <MoodDot mood="quiet" /> Quiet
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border/70 bg-secondary/40 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="max-w-2xl text-4xl leading-tight">
            Four quiet tools instead of forty features.
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="stagger rounded-xl border border-border/70 bg-card p-6 transition-shadow duration-500 hover:shadow-lift"
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <f.icon className="size-5 text-primary" />
                <h3 className="mt-4 text-xl">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-muted-foreground">
              WHY IT WORKS
            </p>
            <h2 className="mt-4 text-4xl leading-tight">
              The habit is not the eloquence, it is the returning.
            </h2>
            <p className="mt-5 text-ink-soft">
              Blank pages intimidate. Cluttered apps distract. Papertrail asks one question, keeps
              the interface out of the way, and quietly records that you showed up.
            </p>
            <div className="mt-8 flex items-center gap-3 rounded-xl border border-border/70 bg-accent px-5 py-4">
              <Flame className="size-5 text-clay" />
              <p className="text-sm">
                <span className="font-semibold">12 days of showing up.</span>{" "}
                <span className="text-ink-soft">Small pages become a life.</span>
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {entries.slice(0, 3).map((e, i) => (
              <Link
                key={e.id}
                to="/entries/$entryId"
                params={{ entryId: e.id }}
                className="stagger block rounded-xl border border-border/70 bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MoodDot mood={e.mood} /> {e.displayDate}
                </span>
                <h3 className="mt-2 text-2xl">{e.title}</h3>
                <p className="mt-1 text-sm text-ink-soft">{e.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border/70 py-24 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <Logo showWord={false} className="justify-center" />
          <h2 className="mt-6 font-serif text-4xl leading-tight">
            "The point was never to write a perfect story. It was to leave a trail back to the
            moments that mattered."
          </h2>
          <Link
            to="/signup"
            className="mt-9 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-medium text-primary-foreground transition-all duration-300 hover:shadow-lift"
          >
            Start your trail <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <footer className="border-t border-border/70 py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 text-sm text-muted-foreground">
          <Logo />
          <div className="flex gap-6">
            <Link to="/prompts" className="underline-grow">
              Prompt library
            </Link>
            <Link to="/login" className="underline-grow">
              Sign in
            </Link>
            <Link to="/signup" className="underline-grow">
              Create account
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
