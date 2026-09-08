import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { moods, type MoodKey } from "@/lib/journal-data";
import { completeOnboarding } from "@/lib/journal-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Welcome — Papertrail" },
      { name: "description", content: "Set up your journal in under a minute." },
    ],
  }),
  component: OnboardingPage,
});

function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [mood, setMood] = useState<MoodKey>("quiet");

  const steps = [
    {
      title: "Welcome to Papertrail",
      body: "A quiet space for daily writing. One prompt, one page, one honest word.",
    },
    {
      title: "Choose your default mood",
      body: "This will be pre-selected when you start a new page. You can always change it later.",
    },
    {
      title: "You are ready",
      body: "Your journal is waiting. Come back tomorrow and the trail starts to show.",
    },
  ];

  const handleNext = () => {
    if (step === steps.length - 1) {
      completeOnboarding();
      toast.success("Welcome to your journal");
      navigate({ to: "/today" });
    } else {
      setStep((s) => s + 1);
    }
  };

  const currentStep = steps[step];
  if (!currentStep) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-md">
        <div className="text-center">
          <p className="text-[0.68rem] font-semibold tracking-[0.18em] text-muted-foreground">
            STEP {step + 1} OF {steps.length}
          </p>
          <h1 className="mt-3 animate-ink text-4xl">{currentStep.title}</h1>
          <p className="mt-3 text-sm text-ink-soft">{currentStep.body}</p>
        </div>

        {step === 1 && (
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {moods.map((m) => (
              <button
                key={m.key}
                type="button"
                onClick={() => setMood(m.key)}
                className={cn(
                  "flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors",
                  mood === m.key
                    ? "border-primary bg-accent text-foreground"
                    : "border-border/70 text-ink-soft hover:bg-accent",
                )}
              >
                <span className="size-2.5 rounded-full" style={{ backgroundColor: m.color }} />
                {m.label}
              </button>
            ))}
          </div>
        )}

        <div className="mt-10 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            {step === 1 ? "Pick the mood that feels most like you today" : ""}
          </span>
          <Button onClick={handleNext}>
            {step === steps.length - 1 ? "Start writing" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
}
