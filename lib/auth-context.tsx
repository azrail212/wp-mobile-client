import { createContext, useContext, useEffect, useState } from "react";
import { apiGet } from "./api";
import { deleteToken, getToken } from "./token";

type User = {
  id: number;
  username: string;
  email: string;
  roles: string[];
};

type AuthState = {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    validate();
    // Re-validate token every 30 seconds to catch expiration
    const interval = setInterval(validate, 30000);
    return () => clearInterval(interval);
  }, []);

  async function validate() {
    const token = await getToken();

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const me = await apiGet<User>("/bgh/v1/me");
      setUser(me);
      console.log("[Auth] Token is valid, user:", me.username);
    } catch (error) {
      // Token invalid or expired
      console.log("[Auth] Token validation failed, logging out:", error);
      await deleteToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await deleteToken();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
