import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Logo } from "@/components/Logo";
import { prompts } from "@/lib/journal-data";

export function AuthLayout({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_1.1fr]">
      <div className="paper-grain flex flex-col px-6 py-8 sm:px-10 lg:px-12">
        <Link to="/" className="animate-fade-in">
          <Logo />
        </Link>
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-14">
          <p className="stagger text-[0.68rem] font-semibold tracking-[0.18em] text-muted-foreground">
            {eyebrow}
          </p>
          <h1 className="mt-3 animate-ink text-5xl">{title}</h1>
          <p className="stagger mt-3 text-sm text-ink-soft" style={{ animationDelay: "120ms" }}>
            {subtitle}
          </p>
          <div className="stagger mt-9" style={{ animationDelay: "200ms" }}>
            {children}
          </div>
          <div className="mt-8 text-sm text-muted-foreground">{footer}</div>
        </div>
      </div>

      <div className="relative hidden overflow-hidden border-l border-border/70 bg-secondary/50 lg:block">
        <div className="paper-grain absolute inset-0" />
        <div className="relative flex h-full flex-col justify-center gap-8 px-16">
          <div
            className="stagger w-full max-w-md -rotate-1 rounded-xl border border-border/70 bg-accent p-6 shadow-paper"
            style={{ animationDelay: "260ms" }}
          >
            <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-muted-foreground">
              TODAY'S PROMPT
            </p>
            <p className="mt-3 font-serif text-2xl leading-snug">{prompts[0]}</p>
          </div>
          <div
            className="stagger w-full max-w-md rounded-xl border border-border/70 bg-card p-7 shadow-lift"
            style={{ animationDelay: "360ms" }}
          >
            <p className="text-xs text-muted-foreground">May 17, 2024 · Morning pages</p>
            <div className="ruled-lines mt-4 font-serif text-[1.05rem] text-ink-soft">
              <p className="mb-4">
                The morning arrived softly today. I made tea before checking my phone, and for a few
                minutes I could hear the house breathing around me.
              </p>
            </div>
          </div>
          <p
            className="stagger max-w-md font-serif text-lg text-ink-soft"
            style={{ animationDelay: "460ms" }}
          >
            "Three sentences is still a page. I am counting it."
          </p>
        </div>
      </div>
    </div>
  );
}
