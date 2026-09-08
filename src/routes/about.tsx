import { createFileRoute, Link } from "@tanstack/react-router";

import { Logo } from "@/components/Logo";
import { SectionCard } from "@/components/AppShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Papertrail" },
      {
        name: "description",
        content: "About Papertrail and why it exists.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background paper-grain">
      <div className="mx-auto max-w-2xl px-6 py-12">
        <Link to="/" className="inline-block">
          <Logo />
        </Link>
        <h1 className="mt-8 animate-ink text-4xl text-foreground">About</h1>
        <p className="mt-2 text-sm text-muted-foreground">A quiet space for daily writing.</p>

        <div className="mt-10 space-y-5">
          <SectionCard>
            <h3 className="text-xl text-foreground">Why Papertrail</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Most journaling apps are cluttered with features you do not need. Papertrail is
              different. It gives you one prompt, one page, and one honest word for how the day
              felt. No feeds, no notifications, no noise.
            </p>
          </SectionCard>

          <SectionCard>
            <h3 className="text-xl text-foreground">The habit, not the eloquence</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              The goal is not to write a perfect story. It is to show up. Small pages become a life.
              Come back tomorrow and the trail starts to show.
            </p>
          </SectionCard>

          <SectionCard>
            <h3 className="text-xl text-foreground">Your data stays yours</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Everything you write is stored locally on your device. We do not collect, read, or
              share your entries. Your words belong to you.
            </p>
          </SectionCard>

          <SectionCard>
            <h3 className="text-xl text-foreground">Built with care</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Papertrail is designed to feel like paper — calm, familiar, and distraction-free. The
              interface stays out of your way so you can focus on what matters.
            </p>
          </SectionCard>
        </div>

        <p className="mt-10 text-xs text-muted-foreground">
          <Link to="/" className="underline-grow">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
