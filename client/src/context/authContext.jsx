/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState, createContext } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const { data } = await api.get("/auth/profile");
        setUser(data.user);
      } catch (err) {
        console.error("there was an error:", err);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const login = async (email, password) => {
    const response = await api.post("/login", { email, password });
    const { token, data } = response.data;
    localStorage.setItem("token", token);
    setUser(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
