import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { AuthLayout } from "@/components/AuthLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/session";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your journal — Papertrail" },
      {
        name: "description",
        content:
          "Create a free Papertrail journal: daily prompt cards, mood tagging, calendar view and yearly reflection.",
      },
      { property: "og:title", content: "Create your journal — Papertrail" },
      {
        property: "og:description",
        content: "Start your first page in under a minute. No blank-page dread.",
      },
    ],
  }),
  component: SignupPage,
});

const perks = ["One prompt a day", "Five honest moods", "A year you can reread"];

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <AuthLayout
      eyebrow="START YOUR TRAIL"
      title="Your first page"
      subtitle="Three fields, then a question waiting for you. That's the whole setup."
      footer={
        <>
          Already writing?{" "}
          <Link to="/login" className="underline-grow font-medium text-foreground">
            Sign in
          </Link>
        </>
      }
    >
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          signIn({ name: name || "Morgan Lee", email: email || "morgan@papertrail.app" });
          toast.success("Your journal is ready");
          navigate({ to: "/today" });
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="name">What should we call you?</Label>
          <Input
            id="name"
            required
            placeholder="Morgan Lee"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-12 bg-card"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 bg-card"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Choose a password</Label>
          <Input id="password" type="password" required className="h-12 bg-card" />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-primary py-3.5 text-sm font-medium text-primary-foreground transition-all duration-200 hover:shadow-green"
        >
          Create my journal
        </button>
        <ul className="space-y-2 pt-1">
          {perks.map((p) => (
            <li key={p} className="flex items-center gap-2 text-sm text-ink-soft">
              <Check className="size-4 text-primary" /> {p}
            </li>
          ))}
        </ul>
      </form>
    </AuthLayout>
  );
}
