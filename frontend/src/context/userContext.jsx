import React, { createContext, useState, useEffect } from "react";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hydrate user from localStorage first
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // If token exists, fetch latest profile
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
          setUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
          clearUser();
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    } else {
      // No token → done loading
      setLoading(false);
    }
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    if (userData.token) {
      localStorage.setItem("token", userData.token);
    }
    setLoading(false);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;