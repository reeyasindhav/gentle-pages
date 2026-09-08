import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { type LucideIcon, LogOut, Moon, Sun } from "lucide-react";

import { AppShell, SectionCard } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { signOut, type Session, getSession } from "@/lib/session";
import { user } from "@/lib/journal-data";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "papertrail.theme";
type Theme = "light" | "dark" | "system";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Papertrail" },
      {
        name: "description",
        content: "Theme, account and journal settings for Papertrail.",
      },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<Theme>("system");
  const [resolvedDark, setResolvedDark] = useState(false);

  useEffect(() => {
    const stored = (
      typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null
    ) as Theme | null;
    const initial = stored ?? "system";
    applyTheme(initial);
    setTheme(initial);
  }, []);

  function applyTheme(next: Theme) {
    const root = document.documentElement;
    if (next === "system") {
      const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", dark);
      setResolvedDark(dark);
    } else {
      const dark = next === "dark";
      root.classList.toggle("dark", dark);
      setResolvedDark(dark);
    }
  }

  const updateTheme = (next: Theme) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
    setTheme(next);
    toast.success(`Theme set to ${next}`);
  };

  const session: Session | null = getSession();
  const accountName = session?.name ?? user.name;
  const accountEmail = session?.email ?? user.email;

  return (
    <AppShell eyebrow="SETTINGS" title="Settings">
      <div className="space-y-8">
        <SectionCard>
          <h3 className="text-xl text-foreground">Appearance</h3>
          <div className="mt-4 space-y-3">
            <ToggleRow
              icon={Sun}
              label="Light"
              selected={theme === "light"}
              onClick={() => updateTheme("light")}
            />
            <ToggleRow
              icon={Moon}
              label="Dark"
              selected={theme === "dark"}
              onClick={() => updateTheme("dark")}
            />
            <ToggleRow
              icon={Sun}
              label="System"
              selected={theme === "system"}
              onClick={() => updateTheme("system")}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Currently {resolvedDark ? "dark" : "light"} mode.
          </p>
        </SectionCard>

        <SectionCard>
          <h3 className="text-xl text-foreground">Reading</h3>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-ink-soft">Use serif type for entry body</span>
            <Switch defaultChecked disabled />
          </div>
        </SectionCard>

        <SectionCard>
          <h3 className="text-xl text-foreground">Account</h3>
          <div className="mt-4 flex items-center gap-4">
            <span className="flex size-10 items-center justify-center rounded-full bg-clay/25 font-serif text-lg">
              {accountName.charAt(0)}
            </span>
            <div>
              <p className="font-semibold text-foreground">{accountName}</p>
              <p className="text-sm text-ink-soft">{accountEmail}</p>
            </div>
          </div>
        </SectionCard>

        <SectionCard>
          <h3 className="text-xl text-foreground">Danger zone</h3>
          <div className="mt-4">
            <Button
              variant="outline"
              onClick={() => {
                signOut();
                toast.success("Signed out");
                navigate({ to: "/login", replace: true });
              }}
            >
              <LogOut className="mr-2 size-4" /> Sign out
            </Button>
            <Link to="/" className="ml-4 text-xs text-muted-foreground underline-grow">
              Back to landing
            </Link>
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}

function ToggleRow({
  icon: Icon,
  label,
  selected,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors",
        selected
          ? "border-primary bg-accent text-foreground"
          : "border-border/70 text-ink-soft hover:bg-accent",
      )}
    >
      <Icon className="size-4" />
      <span>{label}</span>
      {selected && <span className="ml-auto text-xs">✓</span>}
    </button>
  );
}
