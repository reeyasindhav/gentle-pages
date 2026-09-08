export type MoodKey = "quiet" | "hopeful" | "restless" | "grateful" | "heavy";

export const moods: { key: MoodKey; label: string; color: string }[] = [
  { key: "quiet", label: "Quiet", color: "var(--mood-quiet)" },
  { key: "hopeful", label: "Hopeful", color: "var(--mood-hopeful)" },
  { key: "restless", label: "Restless", color: "var(--mood-restless)" },
  { key: "grateful", label: "Grateful", color: "var(--mood-grateful)" },
  { key: "heavy", label: "Heavy", color: "var(--mood-heavy)" },
];

export const moodColor = (key: MoodKey) =>
  moods.find((m) => m.key === key)?.color ?? "var(--mood-quiet)";

export const moodLabel = (key: MoodKey) => moods.find((m) => m.key === key)?.label ?? "Quiet";

export type Entry = {
  id: string;
  date: string; // ISO
  displayDate: string;
  title: string;
  excerpt: string;
  body: string[];
  mood: MoodKey;
  tags: string[];
  words: number;
};

export const entries: Entry[] = [
  {
    id: "a-slower-kind-of-morning",
    date: "2024-05-17",
    displayDate: "May 17, 2024",
    title: "A slower kind of morning",
    excerpt: "The light came in quietly today, making everything feel possible...",
    body: [
      "The morning arrived softly today. I made tea before checking my phone, and for a few minutes I could hear the house breathing around me.",
      "There is something I want to practice: letting a good moment be enough without immediately asking it to become something else.",
      "The light came in quietly today, making everything feel possible in a way that had nothing to do with plans.",
    ],
    mood: "quiet",
    tags: ["morning", "presence"],
    words: 74,
  },
  {
    id: "the-things-i-can-carry",
    date: "2024-05-16",
    displayDate: "May 16, 2024",
    title: "The things I can carry",
    excerpt: "I am learning that not every thought needs to become a task...",
    body: [
      "I am learning that not every thought needs to become a task. Some of them just want to be noticed and then set back down.",
      "I made a list of what is actually mine to carry this week. It was shorter than I expected, and that felt like a small mercy.",
    ],
    mood: "hopeful",
    tags: ["learning"],
    words: 61,
  },
  {
    id: "a-note-to-future-me",
    date: "2024-05-14",
    displayDate: "May 14, 2024",
    title: "A note to future me",
    excerpt: "When you read this, I hope you remember how brave it felt to begin...",
    body: [
      "When you read this, I hope you remember how brave it felt to begin. Not the finishing — the beginning, which nobody applauds.",
      "You were tired and you wrote anyway. That is the whole record.",
    ],
    mood: "grateful",
    tags: ["future self", "beginning"],
    words: 58,
  },
  {
    id: "on-making-room",
    date: "2024-05-11",
    displayDate: "May 11, 2024",
    title: "On making room",
    excerpt: "There is a particular freedom in leaving one corner of the day unplanned...",
    body: [
      "There is a particular freedom in leaving one corner of the day unplanned. I walked without a destination and came home with nothing to report.",
      "Still, it was the part of the day I remember.",
    ],
    mood: "quiet",
    tags: ["space"],
    words: 47,
  },
  {
    id: "the-weather-inside",
    date: "2024-05-08",
    displayDate: "May 8, 2024",
    title: "The weather inside",
    excerpt: "Restless again, though nothing in particular went wrong...",
    body: [
      "Restless again, though nothing in particular went wrong. I keep expecting my moods to give reasons before they arrive.",
      "Naming it helped. Quiet is not the same as calm, and I am starting to tell them apart.",
    ],
    mood: "restless",
    tags: ["mood", "attention"],
    words: 55,
  },
  {
    id: "small-repairs",
    date: "2024-05-04",
    displayDate: "May 4, 2024",
    title: "Small repairs",
    excerpt: "I fixed the drawer that has been sticking since February...",
    body: [
      "I fixed the drawer that has been sticking since February. Twenty minutes of work for four months of small irritation.",
      "I wonder how many other things are like that.",
    ],
    mood: "grateful",
    tags: ["home", "patience"],
    words: 44,
  },
  {
    id: "what-the-body-knew",
    date: "2024-04-29",
    displayDate: "April 29, 2024",
    title: "What the body knew first",
    excerpt: "My shoulders knew about the week before I did...",
    body: [
      "My shoulders knew about the week before I did. I have been carrying a decision around like a bag I forgot I picked up.",
      "Wrote it out. Decided nothing. Slept better anyway.",
    ],
    mood: "heavy",
    tags: ["body", "change"],
    words: 52,
  },
  {
    id: "enough-for-today",
    date: "2024-04-25",
    displayDate: "April 25, 2024",
    title: "Enough for today",
    excerpt: "Three sentences is still a page. I am counting it...",
    body: [
      "Three sentences is still a page. I am counting it.",
      "The habit is not the eloquence, it is the returning.",
    ],
    mood: "hopeful",
    tags: ["enough", "habit"],
    words: 31,
  },
];

export const prompts = [
  "What is asking for your attention today?",
  "What did your body notice before your mind did?",
  "Name one thing you are ready to set down.",
  "What felt like enough today?",
  "Where did the day surprise you?",
  "What would you like to remember about this week in ten years?",
  "What are you practising, quietly?",
  "Who were you kind to today — including yourself?",
];

export const promptCollections = [
  {
    name: "Morning pages",
    blurb: "Three unedited pages before the day makes its demands.",
    count: 24,
    prompts: [
      "What is asking for your attention today?",
      "What did you dream about, even vaguely?",
      "What is the first honest sentence you can write?",
    ],
  },
  {
    name: "Gentle inventory",
    blurb: "A slow look at what you are carrying and why.",
    count: 18,
    prompts: [
      "Name one thing you are ready to set down.",
      "What is actually yours to carry this week?",
      "What have you outgrown without noticing?",
    ],
  },
  {
    name: "Evening close",
    blurb: "Put the day away without judging it.",
    count: 21,
    prompts: [
      "What felt like enough today?",
      "What would you like to leave here?",
      "What small thing went right?",
    ],
  },
  {
    name: "Year in pages",
    blurb: "Longer prompts for looking back across seasons.",
    count: 12,
    prompts: [
      "Which month felt longest, and why?",
      "What did you keep returning to?",
      "What would your January self not believe?",
    ],
  },
];

export const yearStats = {
  pages: 184,
  writingDays: 142,
  longestStreak: 24,
  percentOfYear: 39,
};

export const rhythm = [
  { month: "J", value: 9 },
  { month: "F", value: 13 },
  { month: "M", value: 11 },
  { month: "A", value: 16 },
  { month: "M", value: 14 },
  { month: "J", value: 17 },
  { month: "J", value: 10 },
  { month: "A", value: 15 },
  { month: "S", value: 16 },
  { month: "O", value: 12 },
  { month: "N", value: 10 },
  { month: "D", value: 15 },
];

export const recurringThemes = [
  { word: "home", weight: 3 },
  { word: "beginning", weight: 2 },
  { word: "patience", weight: 3 },
  { word: "body", weight: 2 },
  { word: "attention", weight: 3 },
  { word: "enough", weight: 2 },
  { word: "change", weight: 2 },
];

export const moodDistribution: { mood: MoodKey; share: number }[] = [
  { mood: "quiet", share: 34 },
  { mood: "hopeful", share: 26 },
  { mood: "grateful", share: 18 },
  { mood: "restless", share: 14 },
  { mood: "heavy", share: 8 },
];

/** Days of May 2024 that have an entry, keyed by day number. */
export const mayEntryDays: Record<number, string> = {
  4: "small-repairs",
  8: "the-weather-inside",
  11: "on-making-room",
  14: "a-note-to-future-me",
  16: "the-things-i-can-carry",
  17: "a-slower-kind-of-morning",
};

export const user = {
  name: "Morgan Lee",
  initial: "M",
  subtitle: "Personal journal",
  streak: 12,
  joined: "March 2023",
  email: "morgan@papertrail.app",
};

export const favKey = "papertrail.favorites";
export const booksKey = "papertrail.books";

export function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(favKey) || "[]");
  } catch {
    return [];
  }
}

export function toggleFavorite(id: string): string[] {
  const current = getFavorites();
  const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
  window.localStorage.setItem(favKey, JSON.stringify(next));
  return next;
}

export function getBooks() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(booksKey) || "[]");
  } catch {
    return [];
  }
}

export type Book = {
  bookName: string;
  learnings: string;
  experience: string;
  date: string;
};

export function saveBook(book: Book) {
  const existing = getBooks();
  existing.unshift(book);
  window.localStorage.setItem(booksKey, JSON.stringify(existing));
  return existing;
}

export function getTagCounts() {
  const counts: Record<string, number> = {};
  entries.forEach((e) => {
    e.tags.forEach((t) => {
      counts[t] = (counts[t] || 0) + 1;
    });
  });
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getStats() {
  const totalWords = entries.reduce((sum, e) => sum + e.words, 0);
  const sorted = [...entries].sort((a, b) => b.words - a.words);
  const longestEntry = sorted[0] ?? null;
  const moodCounts: Record<string, number> = {};
  entries.forEach((e) => {
    moodCounts[e.mood] = (moodCounts[e.mood] || 0) + 1;
  });
  const topMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "quiet";
  return {
    totalEntries: entries.length,
    totalWords,
    avgWords: entries.length ? Math.round(totalWords / entries.length) : 0,
    longestEntry: longestEntry ?? {
      id: "",
      title: "No entries yet",
      excerpt: "",
      date: "",
      displayDate: "",
      mood: "quiet",
      tags: [],
      words: 0,
    },
    topMood,
    streak: user.streak,
    thisMonth: entries.filter((e) => e.date.startsWith("2024-05")).length,
  };
}

export const onboardingKey = "papertrail.onboarded";

export function isOnboarded(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(onboardingKey) === "true";
}

export function completeOnboarding() {
  window.localStorage.setItem(onboardingKey, "true");
}
