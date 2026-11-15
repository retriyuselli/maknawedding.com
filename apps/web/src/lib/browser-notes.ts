export function readNotes<T>(username: string, area: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(noteKey(username, area));
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeNotes<T>(username: string, area: string, items: T[]) {
  window.localStorage.setItem(noteKey(username, area), JSON.stringify(items));
}

function noteKey(username: string, area: string) {
  return `makna-catatan:${username}:${area}`;
}
