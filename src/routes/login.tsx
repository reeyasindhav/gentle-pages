import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AuthLayout } from "@/components/AuthLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/session";
import { user } from "@/lib/journal-data";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Papertrail" },
      {
        name: "description",
        content: "Sign in to Papertrail to continue your journaling trail and today's page.",
      },
      { property: "og:title", content: "Sign in — Papertrail" },
      { property: "og:description", content: "Return to your pages and today's prompt." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("papertrail");

  return (
    <AuthLayout
      eyebrow="WELCOME BACK"
      title="Pick up the thread"
      subtitle="Your pages are exactly where you left them."
      footer={
        <>
          New here?{" "}
          <Link to="/signup" className="underline-grow font-medium text-foreground">
            Create an account
          </Link>
        </>
      }
    >
      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          signIn({ name: user.name, email });
          toast.success("Welcome back, Morgan");
          navigate({ to: "/today" });
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 bg-card"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/reset-password" className="text-xs text-muted-foreground underline-grow">
              Forgot?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 bg-card"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-primary py-3.5 text-sm font-medium text-primary-foreground transition-all duration-200 hover:shadow-green"
        >
          Open my journal
        </button>
        <p className="text-center text-xs text-muted-foreground">
          Demo account is pre-filled — just continue.
        </p>
      </form>
    </AuthLayout>
  );
}
