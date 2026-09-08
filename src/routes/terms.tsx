import { createFileRoute, Link } from "@tanstack/react-router";

import { Logo } from "@/components/Logo";
import { SectionCard } from "@/components/AppShell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms — Papertrail" },
      {
        name: "description",
        content: "Terms of use for Papertrail.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen bg-background paper-grain">
      <div className="mx-auto max-w-2xl px-6 py-12">
        <Link to="/" className="inline-block">
          <Logo />
        </Link>
        <h1 className="mt-8 animate-ink text-4xl text-foreground">Terms</h1>
        <p className="mt-2 text-sm text-muted-foreground">Terms of use for Papertrail.</p>

        <div className="mt-10 space-y-5">
          <SectionCard>
            <h3 className="text-xl text-foreground">Acceptance of terms</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              By using Papertrail, you agree to these terms. If you do not agree, please do not use
              the app.
            </p>
          </SectionCard>

          <SectionCard>
            <h3 className="text-xl text-foreground">Your content</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              You own all the writing, notes, and book entries you create in Papertrail. We do not
              claim any ownership over your content.
            </p>
          </SectionCard>

          <SectionCard>
            <h3 className="text-xl text-foreground">Data storage</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Papertrail stores data locally on your device. We are not responsible for data loss
              resulting from browser data clearing, device failure, or other local storage issues.
            </p>
          </SectionCard>

          <SectionCard>
            <h3 className="text-xl text-foreground">Limitation of liability</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Papertrail is provided as-is without warranties. We are not liable for any loss of
              data, personal reflection, or other content stored in the app.
            </p>
          </SectionCard>

          <SectionCard>
            <h3 className="text-xl text-foreground">Changes to terms</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              We may update these terms from time to time. Continued use of the app after changes
              implies acceptance of the updated terms.
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
