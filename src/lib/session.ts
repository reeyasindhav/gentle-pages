const KEY = "papertrail.session";

export type Session = { name: string; email: string };

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function signIn(session: Session) {
  window.localStorage.setItem(KEY, JSON.stringify(session));
  window.dispatchEvent(new Event("papertrail:session"));
}

export function signOut() {
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("papertrail:session"));
}
