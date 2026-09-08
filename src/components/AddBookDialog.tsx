import { useState } from "react";
import { toast } from "sonner";
import { BookOpen, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AddBookDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddBookDialog({ open, onOpenChange }: AddBookDialogProps) {
  const [bookName, setBookName] = useState("");
  const [learnings, setLearnings] = useState("");
  const [experience, setExperience] = useState("");

  const handleSave = () => {
    if (!bookName.trim()) {
      toast.error("Please enter a book name");
      return;
    }
    const entry = {
      bookName: bookName.trim(),
      learnings: learnings.trim(),
      experience: experience.trim(),
      date: new Date().toISOString(),
    };
    const existing = JSON.parse(window.localStorage.getItem("papertrail.books") || "[]");
    existing.unshift(entry);
    window.localStorage.setItem("papertrail.books", JSON.stringify(existing));
    toast.success("Book added to your journal");
    setBookName("");
    setLearnings("");
    setExperience("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-0 shadow-xl sm:rounded-xl">
        <DialogHeader className="border-b border-border/50 px-6 pt-6 pb-4">
          <DialogTitle className="font-serif text-2xl text-foreground">Add to My Book</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 px-6 py-5">
          <div className="space-y-2">
            <Label htmlFor="book-name">Book name</Label>
            <Input
              id="book-name"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              placeholder="e.g. Atomic Habits"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="learnings">What I learned</Label>
            <Textarea
              id="learnings"
              value={learnings}
              onChange={(e) => setLearnings(e.target.value)}
              placeholder="Key takeaways, ideas, or lessons..."
              className="min-h-[100px] resize-none"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">My experience</Label>
            <Textarea
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="How this book changed your perspective or what you felt while reading..."
              className="min-h-[100px] resize-none"
              rows={4}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-border/50 px-6 py-4">
          <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
            <X className="mr-2 size-4" /> Cancel
          </Button>
          <Button size="sm" onClick={handleSave}>
            <BookOpen className="mr-2 size-4" /> Save book
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
