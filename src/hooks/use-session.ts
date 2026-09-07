import { useEffect, useState } from "react";
import { getSession, type Session } from "@/lib/session";

/** Client-only mock session. `ready` is false until hydration completes. */
export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setSession(getSession());
    sync();
    setReady(true);
    window.addEventListener("papertrail:session", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("papertrail:session", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return { session, ready };
}
