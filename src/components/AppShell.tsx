import { Link, useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  CalendarDays,
  ChevronDown,
  Flame,
  PenLine,
  Plus,
  Search,
  Settings,
  Sparkles,
  LogOut,
  Quote,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Logo } from "@/components/Logo";
import { useSession } from "@/hooks/use-session";
import { signOut } from "@/lib/session";
import { entries, user } from "@/lib/journal-data";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const nav = [
  { to: "/today", label: "Today", icon: PenLine, dot: true },
  { to: "/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/entries", label: "Entries", icon: BookOpen },
  { to: "/prompts", label: "Prompt library", icon: Quote },
  { to: "/review", label: "Year in review", icon: Sparkles },
] as const;

export function AppShell({
  eyebrow,
  title,
  children,
  aside,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  const navigate = useNavigate();
  const { session, ready } = useSession();
  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (ready && !session) navigate({ to: "/login", replace: true });
  }, [ready, session, navigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearch((s) => !s);
      }
      if (e.key === "n" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        navigate({ to: "/today" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  const name = session?.name ?? user.name;

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 hidden h-screen w-[19.5rem] shrink-0 flex-col border-r border-sidebar-border bg-sidebar px-6 py-8 lg:flex">
        <Link to="/" className="animate-fade-in">
          <Logo />
        </Link>

        <Link
          to="/today"
          className="mt-8 flex items-center justify-between rounded-lg border border-primary/15 bg-accent px-4 py-3.5 text-sm font-medium text-accent-foreground transition-all duration-300 hover:border-primary/35 hover:shadow-paper"
        >
          <span className="flex items-center gap-2.5">
            <Plus className="size-4" />
            New entry
          </span>
          <span className="text-xs tracking-wider text-muted-foreground">⌘N</span>
        </Link>

        <p className="mt-9 mb-3 text-[0.68rem] font-semibold tracking-[0.18em] text-muted-foreground">
          YOUR TRAIL
        </p>
        <nav className="flex flex-col gap-1">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "bg-sidebar-accent text-accent-foreground font-medium" }}
              className="group flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-ink-soft transition-colors duration-200 hover:bg-sidebar-accent/60"
            >
              <item.icon className="size-4 transition-transform duration-300 group-hover:-rotate-6" />
              <span className="flex-1">{item.label}</span>
              {item.dot && <span className="size-1.5 rounded-full bg-clay" />}
            </Link>
          ))}
        </nav>

        <div className="mt-auto space-y-5">
          <div className="flex items-center gap-3 border-t border-sidebar-border pt-6">
            <Flame className="size-5 text-clay" />
            <div>
              <p className="text-sm font-semibold">{user.streak} day streak</p>
              <p className="text-xs text-muted-foreground">Keep the thread going</p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex w-full items-center gap-3 border-t border-sidebar-border pt-5 text-left">
              <span className="flex size-9 items-center justify-center rounded-full bg-clay/25 font-serif text-sm">
                {name.charAt(0)}
              </span>
              <span className="flex-1">
                <span className="block text-sm font-semibold">{name}</span>
                <span className="block text-xs text-muted-foreground">{user.subtitle}</span>
              </span>
              <ChevronDown className="size-4 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem onClick={() => navigate({ to: "/settings" })}>
                <Settings className="mr-2 size-4" /> Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  signOut();
                  navigate({ to: "/", replace: true });
                }}
              >
                <LogOut className="mr-2 size-4" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      <main className="paper-grain min-w-0 flex-1 px-6 py-10 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-[74rem]">
          <header className="flex flex-wrap items-start justify-between gap-6">
            <div className="stagger">
              <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-muted-foreground">
                {eyebrow}
              </p>
              <h1 className="mt-3 animate-ink text-5xl sm:text-6xl">{title}</h1>
            </div>
            <div className="flex items-center gap-3 animate-fade-in">
              <button
                onClick={() => setSearch(true)}
                aria-label="Search entries"
                className="flex size-11 items-center justify-center rounded-full bg-card text-ink-soft shadow-paper transition-transform duration-300 hover:scale-105"
              >
                <Search className="size-4" />
              </button>
              <Link
                to="/settings"
                className="flex size-11 items-center justify-center rounded-full bg-clay/25 font-serif transition-transform duration-300 hover:scale-105"
              >
                {name.charAt(0)}
              </Link>
            </div>
          </header>

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <div className="min-w-0">{children}</div>
            {aside ? <div className="min-w-0">{aside}</div> : null}
          </div>
        </div>
      </main>

      <CommandDialog open={search} onOpenChange={setSearch}>
        <CommandInput placeholder="Search your pages..." />
        <CommandList>
          <CommandEmpty>No pages found.</CommandEmpty>
          <CommandGroup heading="Entries">
            {entries.map((e) => (
              <CommandItem
                key={e.id}
                value={`${e.title} ${e.tags.join(" ")}`}
                onSelect={() => {
                  setSearch(false);
                  navigate({ to: "/entries/$entryId", params: { entryId: e.id } });
                }}
              >
                <span className="font-serif">{e.title}</span>
                <span className="ml-auto text-xs text-muted-foreground">{e.displayDate}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}

export function SectionCard({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/70 bg-card p-6 shadow-paper transition-shadow duration-500 hover:shadow-lift",
        className,
      )}
    >
      {children}
    </div>
  );
}
