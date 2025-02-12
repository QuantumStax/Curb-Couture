/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // To store user details

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await fetch("http://localhost:3000/validate", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setIsAuthenticated(data.isAuthenticated);
          setIsAdmin(data.user?.role === "admin");
          setUser(data.user || null);
        } else {
          setIsAuthenticated(false);
          setIsAdmin(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
        setIsAdmin(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const setAuthState = ({ isAuthenticated, isAdmin, user }) => {
    setIsAuthenticated(isAuthenticated);
    setIsAdmin(isAdmin);
    setUser(user);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isAdmin, loading, user, setAuthState }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
