import React, { createContext, useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { http } from "@/utils/http";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPatientAccount, setIsPatientAccount] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const location = useLocation();

  const login = () => setIsLoggedIn(true);

  const logout = async () => {
    setIsLoggedIn(false);
    try {
      await http.post(`logout`, {});
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      navigate("/login");
    }
  };

  // Check auth status on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await http.get("check-session");
        if (response.status === 200) {
          const data = await response.json();
          setIsLoggedIn(true);
          setIsPatientAccount(data.role === "patient");
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
