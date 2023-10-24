import { AuthContext } from "@/context";
import { useContext, useEffect } from "react";

export const LogoutPage = () => {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <main className="mx-auto max-w-7xl p-4">
      <p className="mx-auto text-center text-muted-foreground">
        Logging out... 👋
      </p>
    </main>
  );
};
