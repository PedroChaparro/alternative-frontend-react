import { ReactNode, createContext } from "react";

import { SessionState, useSession } from "../hooks/UseSession";

interface AuthContextState {
  session: SessionState | null;
  isSessionLoading: boolean;
  login: (_username: string, _password: string) => Promise<boolean>;
  logout: () => void;
  updateSession: (username: string, token: string) => void;
}

export const AuthContext = createContext<AuthContextState>({
  session: null,
  isSessionLoading: true,
  login: async () => false,
  logout: () => {},
  updateSession: () => {}
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const { session, loading, login, logout, updateSession } = useSession();

  return (
    <AuthContext.Provider
      value={{
        session,
        isSessionLoading: loading,
        login,
        logout,
        updateSession
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
