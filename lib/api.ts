const API_BASE = "https://balkangamehub.com/wp-json";

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);

  if (!res.ok) {
    throw new Error(`API error ${res.status}`);
  }

  return res.json();
}
