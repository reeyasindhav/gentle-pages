import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Save, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { MoodDot } from "@/components/MoodDot";
import { cn } from "@/lib/utils";
import { moods, type MoodKey, prompts } from "@/lib/journal-data";

interface NewEntryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewEntryDialog({ open, onOpenChange }: NewEntryDialogProps) {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [mood, setMood] = useState<MoodKey>("quiet");

  const trimmed = text.trim();
  const words = trimmed === "" ? 0 : trimmed.split(/\s+/).length;
  const prompt = prompts[0] ?? "What is asking for your attention today?";

  const handleSave = () => {
    const page = { prompt, body: text, mood, words };
    window.localStorage.setItem("papertrail.today", JSON.stringify(page));
    toast.success("Page saved to your journal");
    onOpenChange(false);
    setTimeout(() => navigate({ to: "/today" }), 150);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.metaKey && e.key === "s") {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 shadow-xl sm:rounded-xl">
        <DialogHeader className="border-b border-border/50 px-6 pt-6 pb-4">
          <DialogTitle className="font-serif text-2xl text-foreground">New page</DialogTitle>
        </DialogHeader>

        <div className="px-6 py-4">
          <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-muted-foreground">
            TODAY'S PROMPT
          </p>
          <p className="mt-2 font-serif text-xl leading-snug text-foreground">{prompt}</p>
        </div>

        <div className="px-6">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Begin anywhere… a single sentence is enough."
            className="min-h-[240px] resize-none border-0 bg-transparent font-serif text-[1.05rem] leading-[1.6] text-ink-soft outline-none placeholder:text-ink-soft/40 focus:ring-0"
            rows={10}
          />
          <div className="mt-4 flex items-center justify-between border-t border-rule pt-4">
            <span className="text-xs text-muted-foreground">{words} words</span>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(prompt).catch(() => {
                  toast.error("Failed to copy prompt");
                });
              }}
              className="text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
            >
              Copy prompt
            </button>
          </div>
        </div>

        <div className="border-t border-border/50 px-6 py-4">
          <p className="mb-2 text-[0.62rem] font-semibold tracking-[0.18em] text-muted-foreground">
            HOW TODAY FEELS
          </p>
          <div className="flex flex-wrap gap-2">
            {moods.map((m) => (
              <button
                key={m.key}
                type="button"
                onClick={() => setMood(m.key)}
                className={cn(
                  "flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-colors",
                  mood === m.key
                    ? "border-primary bg-accent text-foreground"
                    : "border-border/70 text-ink-soft hover:bg-accent",
                )}
              >
                <MoodDot mood={m.key} />
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-border/50 px-6 py-4">
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
            <X className="mr-2 size-4" /> Cancel
          </Button>
          <Button size="sm" onClick={handleSave} disabled={words === 0}>
            <Save className="mr-2 size-4" /> Save page
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
