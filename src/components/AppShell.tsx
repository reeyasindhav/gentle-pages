import { Link, useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  CalendarDays,
  ChevronDown,
  Flame,
  type LucideIcon,
  LogOut,
  PenLine,
  Plus,
  Search,
  Settings,
  Star,
  Tag,
  BarChart3,
  Heart,
  Quote,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Logo } from "@/components/Logo";
import { NewEntryDialog } from "@/components/NewEntryDialog";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type NavItem = {
  to:
    | "/today"
    | "/calendar"
    | "/entries"
    | "/prompts"
    | "/review"
    | "/tags"
    | "/favorites"
    | "/books"
    | "/stats";
  label: string;
  icon: LucideIcon;
  dot?: boolean;
};

const nav: NavItem[] = [
  { to: "/today", label: "Today", icon: PenLine, dot: true },
  { to: "/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/entries", label: "Entries", icon: BookOpen },
  { to: "/prompts", label: "Prompt library", icon: Quote },
  { to: "/review", label: "Year in review", icon: Star },
];

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
  const [newEntryOpen, setNewEntryOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

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
        setNewEntryOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  const name = session?.name ?? user.name;

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 hidden h-screen w-[18rem] shrink-0 flex-col border-r border-sidebar-border bg-sidebar px-5 py-8 lg:flex">
        <Link to="/" className="animate-fade-in">
          <Logo />
        </Link>

        <button
          type="button"
          onClick={() => setNewEntryOpen(true)}
          className="mt-8 flex items-center gap-2 rounded-lg border border-primary/15 bg-accent px-3 py-2 text-xs font-medium text-accent-foreground transition-all duration-300 hover:border-primary/35 hover:shadow-green focus:outline-none"
        >
          <Plus className="size-3.5" />
          New entry
          <span className="text-[0.62rem] tracking-wider text-muted-foreground">⌘N</span>
        </button>

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
                  setLogoutOpen(true);
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
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-border/70 pb-4 text-xs font-medium tracking-wide text-muted-foreground">
            <Link to="/today" className="underline-grow hover:text-foreground">
              Today
            </Link>
            <Link to="/entries" className="underline-grow hover:text-foreground">
              Entries
            </Link>
            <Link to="/tags" className="underline-grow hover:text-foreground">
              Tags
            </Link>
            <Link to="/favorites" className="underline-grow hover:text-foreground">
              Favorites
            </Link>
            <Link to="/books" className="underline-grow hover:text-foreground">
              Books
            </Link>
            <Link to="/stats" className="underline-grow hover:text-foreground">
              Stats
            </Link>
            <Link to="/prompts" className="underline-grow hover:text-foreground">
              Prompts
            </Link>
          </nav>

          <header className="flex flex-wrap items-start justify-between gap-6">
            <div className="stagger">
              <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-muted-foreground">
                {eyebrow}
              </p>
              <h1 className="mt-3 animate-ink text-5xl sm:text-6xl">{title}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                <div className="flex items-center gap-2">
                  <BookOpen className="size-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">My Book</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  — your personal reading journal
                </span>
              </div>
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
                aria-label="Settings"
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

      <button
        type="button"
        onClick={() => setNewEntryOpen(true)}
        aria-label="New entry (⌘N)"
        className="fixed bottom-6 right-6 z-20 flex items-center gap-2 rounded-full border border-primary/15 bg-primary/90 px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-paper backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-green focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        <Plus className="size-4" />
        <span className="hidden sm:inline">New entry</span>
        <span className="text-xs opacity-70">⌘N</span>
      </button>

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

      <NewEntryDialog open={newEntryOpen} onOpenChange={setNewEntryOpen} />

      <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <DialogContent className="max-w-sm p-0 shadow-xl sm:rounded-xl">
          <DialogHeader className="border-b border-border/50 px-6 pt-6 pb-4">
            <DialogTitle className="font-serif text-xl text-foreground">Sign out?</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              You can always come back to your journal later.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex items-center justify-end gap-3 border-t border-border/50 px-6 py-4">
            <button
              type="button"
              onClick={() => setLogoutOpen(false)}
              className="rounded-lg px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-accent"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                signOut();
                setLogoutOpen(false);
                navigate({ to: "/", replace: true });
              }}
              className="rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground transition-colors hover:bg-destructive/90"
            >
              Sign out
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function SectionCard({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/70 bg-card p-6 shadow-paper transition-shadow duration-200 hover:shadow-green",
        className,
      )}
    >
      {children}
    </div>
  );
}
