import { createFileRoute, Link } from "@tanstack/react-router";

import { Logo } from "@/components/Logo";
import { SectionCard } from "@/components/AppShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy — Papertrail" },
      {
        name: "description",
        content: "How Papertrail handles your data and privacy.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background paper-grain">
      <div className="mx-auto max-w-2xl px-6 py-12">
        <Link to="/" className="inline-block">
          <Logo />
        </Link>
        <h1 className="mt-8 animate-ink text-4xl text-foreground">Privacy</h1>
        <p className="mt-2 text-sm text-muted-foreground">How Papertrail handles your data.</p>

        <div className="mt-10 space-y-5">
          <SectionCard>
            <h3 className="text-xl text-foreground">What we collect</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Papertrail stores your journal entries, mood tags, book notes, and preferences locally
              on your device. We do not collect or transmit your personal writing to any external
              server.
            </p>
          </SectionCard>

          <SectionCard>
            <h3 className="text-xl text-foreground">Local storage</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              All data is stored in your browser&apos;s localStorage. Clearing your browser data
              will remove your journal. We recommend exporting your entries regularly for backup.
            </p>
          </SectionCard>

          <SectionCard>
            <h3 className="text-xl text-foreground">Cookies and analytics</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Papertrail does not use tracking cookies or third-party analytics. Your reading and
              writing patterns remain private.
            </p>
          </SectionCard>

          <SectionCard>
            <h3 className="text-xl text-foreground">Your control</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              You can delete your data at any time by clearing localStorage or signing out. You own
              your words, and they stay on your device unless you choose otherwise.
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
