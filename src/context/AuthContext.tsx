import { useVerifiedUserValidator } from "@/queries/useAuth";
import { useGlobalStore } from "@/stores/state";
import {
  ReactNode,
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { refetch } = useVerifiedUserValidator();
  const { isLoggedIn } = useGlobalStore();

  useLayoutEffect(() => {
    if (isLoggedIn) {
      refetch();
      setIsAuthenticated(isLoggedIn);
    }
  }, [isLoggedIn, refetch]);

  const value: AuthContextType = {
    isAuthenticated,
    isLoading,
    setIsLoading,
    setIsAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
