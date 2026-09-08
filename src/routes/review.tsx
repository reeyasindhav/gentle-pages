import { createFileRoute } from "@tanstack/react-router";
import { type LucideIcon, Flame, TrendingUp } from "lucide-react";
import * as RechartsPrimitive from "recharts";

import { AppShell, SectionCard } from "@/components/AppShell";
import { MoodDot } from "@/components/MoodDot";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import {
  moodColor,
  moodLabel,
  moodDistribution,
  recurringThemes,
  rhythm,
  type MoodKey,
  yearStats,
} from "@/lib/journal-data";

export const Route = createFileRoute("/review")({
  head: () => ({
    meta: [
      { title: "Year in review — Papertrail" },
      {
        name: "description",
        content:
          "Your yearly reflection: pages written, writing rhythm, recurring themes and moods.",
      },
    ],
  }),
  component: ReviewPage,
});

const chartConfig = {
  pages: { label: "Pages", color: "var(--primary)" },
} satisfies Record<string, { label: string; color: string }>;

function ReviewPage() {
  return (
    <AppShell eyebrow="YEAR IN REVIEW" title="Year in review">
      <div className="space-y-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Pages written"
            value={String(yearStats.pages)}
            icon={Flame}
            iconColor="text-clay"
          />
          <StatCard
            label="Writing days"
            value={String(yearStats.writingDays)}
            icon={TrendingUp}
            iconColor="text-primary"
          />
          <StatCard label="Longest streak" value={`${yearStats.longestStreak} days`} />
          <StatCard label="Of the year" value={`${yearStats.percentOfYear}%`} />
        </div>

        <SectionCard>
          <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-muted-foreground">
            WRITING RHYTHM
          </p>
          <p className="mt-1 text-sm text-ink-soft">Pages written per month.</p>
          <div className="mt-4 h-[220px]">
            <ChartContainer config={chartConfig} className="aspect-auto h-full w-full">
              <RechartsPrimitive.ResponsiveContainer>
                <RechartsPrimitive.BarChart data={rhythm}>
                  <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <RechartsPrimitive.XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <RechartsPrimitive.YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                  <RechartsPrimitive.Bar
                    dataKey="value"
                    fill="var(--primary)"
                    radius={[4, 4, 0, 0]}
                  />
                </RechartsPrimitive.BarChart>
              </RechartsPrimitive.ResponsiveContainer>
            </ChartContainer>
          </div>
        </SectionCard>

        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <SectionCard>
            <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-muted-foreground">
              RECURRING THEMES
            </p>
            <p className="mt-1 text-sm text-ink-soft">Words you kept returning to.</p>
            <div className="mt-5 flex flex-wrap items-end gap-2.5">
              {recurringThemes.map((t) => (
                <span
                  key={t.word}
                  className="font-serif text-ink-soft"
                  style={{ fontSize: `${1 + t.weight * 0.4}rem` }}
                >
                  {t.word}
                </span>
              ))}
            </div>
          </SectionCard>

          <SectionCard>
            <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-muted-foreground">
              YOUR MOODS
            </p>
            <p className="mt-1 text-sm text-ink-soft">How the year felt, in honest words.</p>
            <div className="mt-5 space-y-3">
              {moodDistribution.map((m) => (
                <div key={m.mood} className="flex items-center gap-3">
                  <MoodDot mood={m.mood} className="size-3" />
                  <span className="w-16 text-xs text-muted-foreground">{moodLabel(m.mood)}</span>
                  <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full"
                      style={{ backgroundColor: moodColor(m.mood), width: `${m.share}%` }}
                    />
                  </div>
                  <span className="w-9 text-right text-sm font-medium">{m.share}%</span>
                </div>
              ))}
            </div>
            <PieChart className="mt-5 h-[160px] w-full" data={moodDistribution} />
          </SectionCard>
        </div>
      </div>

      <aside>
        <SectionCard>
          <p className="text-[0.62rem] font-semibold tracking-[0.18em] text-muted-foreground">
            THE TRAIL
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            {yearStats.pages - yearStats.writingDays} pages were written on days you didn't feel
            like starting. The habit is not the eloquence, it is the returning.
          </p>
        </SectionCard>
      </aside>
    </AppShell>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  iconColor,
}: {
  label: string;
  value: string;
  icon?: LucideIcon;
  iconColor?: string;
}) {
  return (
    <SectionCard>
      <div className="flex items-center gap-3">
        {Icon ? <Icon className={cn("size-5", iconColor ?? "text-muted-foreground")} /> : null}
        <div>
          <p className="text-2xl font-semibold text-foreground">{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </div>
    </SectionCard>
  );
}

function PieChart({
  className,
  data,
}: {
  className?: string;
  data: { mood: MoodKey; share: number }[];
}) {
  const pieData = data.map((d) => ({ name: moodLabel(d.mood), value: d.share }));
  const colors = data.map((d) => moodColor(d.mood));

  return (
    <ChartContainer config={chartConfig} className={cn("mx-auto", className)}>
      <RechartsPrimitive.ResponsiveContainer>
        <RechartsPrimitive.PieChart>
          <RechartsPrimitive.Pie
            data={pieData}
            dataKey="value"
            innerRadius="45%"
            outerRadius="70%"
            paddingAngle={2}
          >
            {pieData.map((_, i) => (
              <RechartsPrimitive.Cell key={`cell-${i}`} fill={colors[i] ?? "var(--muted)"} />
            ))}
          </RechartsPrimitive.Pie>
          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        </RechartsPrimitive.PieChart>
      </RechartsPrimitive.ResponsiveContainer>
    </ChartContainer>
  );
}
