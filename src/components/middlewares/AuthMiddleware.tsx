import { AuthContext } from "@/context/index";
import { Loader2 } from "lucide-react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

interface AuthMiddlewareProps {
  children: React.ReactNode;
  mustBeLoggedIn?: boolean;
}

export const AuthMiddleware = ({
  mustBeLoggedIn,
  children
}: AuthMiddlewareProps) => {
  const { isSessionLoading, session } = useContext(AuthContext);

  if (isSessionLoading) {
    return (
      <div className="p-4">
        <Loader2 className="mx-auto animate-spin" />
      </div>
    );
  }

  if (mustBeLoggedIn) {
    // Prevent access to logged-out users
    if (!session) {
      toast.error("You must be logged in to access this page");
      return <Navigate to="/login" />;
    }
  } else {
    // Prevent access to logged-in users
    if (session) {
      toast.error("You are already logged in");
      return <Navigate to="/files" />;
    }
  }

  return children;
};
