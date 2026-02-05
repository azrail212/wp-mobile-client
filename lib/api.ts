import { getToken } from "./token";
const API_BASE = "https://balkangamehub.com/wp-json";

export async function apiGet<T>(path: string): Promise<T> {
  const token = await getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : undefined,
  });

  console.log(`[API] GET ${path} → ${res.status}`);

  if (!res.ok) {
    throw new Error(`API error ${res.status}`);
  }

  return res.json();
}
