import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/AuthLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — Papertrail" },
      {
        name: "description",
        content: "Request a reset link and get back to your Papertrail journal.",
      },
      { property: "og:title", content: "Reset your password — Papertrail" },
      { property: "og:description", content: "A quick way back into your pages." },
    ],
  }),
  component: ResetPage,
});

function ResetPage() {
  const [sent, setSent] = useState(false);

  return (
    <AuthLayout
      eyebrow="A WAY BACK IN"
      title="Reset your password"
      subtitle="We'll send a single link. No password puzzles."
      footer={
        <>
          Remembered it?{" "}
          <Link to="/login" className="underline-grow font-medium text-foreground">
            Back to sign in
          </Link>
        </>
      }
    >
      {sent ? (
        <div className="rounded-xl border border-border/70 bg-accent p-6">
          <p className="font-serif text-2xl">Check your inbox</p>
          <p className="mt-2 text-sm text-ink-soft">
            If that address has a journal, a reset link is on its way.
          </p>
        </div>
      ) : (
        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            toast.success("Reset link sent");
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              className="h-12 bg-card"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-primary py-3.5 text-sm font-medium text-primary-foreground transition-all duration-200 hover:shadow-green"
          >
            Send reset link
          </button>
        </form>
      )}
    </AuthLayout>
  );
}

