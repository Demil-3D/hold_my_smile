import React, { createContext, useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { http } from "@/utils/http";
import { toast } from "sonner";

interface AuthContextType {
  isLoggedIn: boolean;
  isPatientAccount: boolean;
  authLoading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPatientAccount, setIsPatientAccount] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  const login = () => setIsLoggedIn(true);

  const logout = async () => {
    try {
      await http.post(`logout`, {});
      setIsLoggedIn(false);
      navigate("/login");
    } catch (err) {
      console.log("User not logged out", err);
      toast.error("Logout failed!");
    }
  };

  // Check auth status on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await http.get("check-session");
        if (response.ok && response.status === 200) {
          const data = await response.json();
          setIsLoggedIn(true);
          setIsPatientAccount(data.role === "patient");
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        setIsLoggedIn(false);
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();
  }, [location.pathname]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isPatientAccount, authLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
