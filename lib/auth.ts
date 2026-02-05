import { saveToken } from "./token";
type LoginResponse =
  | {
      success: true;
      token: string;
      user: {
        id: number;
        username: string;
        email: string;
        roles: string[];
      };
    }
  | {
      success: false;
      message: string;
    };

export async function login(username: string, password: string) {
  const res = await fetch("https://balkangamehub.com/wp-json/bgh/v1/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error(`Login failed (${res.status})`);
  }

  const data = (await res.json()) as LoginResponse;
  if (data.success) {
    await saveToken(data.token);
  }

  return data;
}
