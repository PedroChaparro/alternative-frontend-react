import { challengeService, loginService } from "@/services/auth/index";
import { useEffect, useState } from "react";

import { useLocalStorage } from "./UseLocalStorage";

export interface SessionState {
  username: string;
  token: string;
}

export const useSession = () => {
  const { setItem, removeItem, getItem } = useLocalStorage();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<SessionState | null>(null);

  // Recover session from localStorage on first render
  useEffect(() => {
    recoverSession();
  }, []);

  const recoverSession = async () => {
    // Get saved data from localStorage
    const username = getItem("username");
    const token = getItem("token");
    if (!username || !token) {
      setLoading(false);
      return;
    }

    // Ensure token is still valid
    const challengeResponse = await challengeService(token);
    if (!challengeResponse.success) {
      setLoading(false);
      logout();
      return;
    }

    // Initialize session
    const session = { username, token };
    setSession(session);
  };

  // Update loading state when session is set
  useEffect(() => {
    if (session) {
      setLoading(false);
      persistSession(session);
    }
  }, [session]);

  const persistSession = (session: SessionState) => {
    setItem("username", session.username);
    setItem("token", session.token);
  };

  const login = async (
    username: string,
    password: string
  ): Promise<{ success: boolean; msg: string }> => {
    setLoading(true);

    const { success, ...res } = await loginService({ username, password });
    if (!success) {
      setLoading(false);
      return { success, msg: res.msg };
    }

    updateSession(username, res.token);
    return { success, msg: "You have successfully logged in" };
  };

  const updateSession = (username: string, token: string) => {
    const updatedSession = { username, token };
    setSession(updatedSession);
  };

  const logout = () => {
    setSession(null);
    removeItem("username");
    removeItem("token");
  };

  return {
    loading,
    session,
    login,
    logout,
    updateSession
  };
};
