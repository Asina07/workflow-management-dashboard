import React, { createContext, useState, useEffect } from "react";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile on component mount
  useEffect(() => {
    if (user) {
      return;
    }
    const accessToken = localStorage.getItem("token");
    if (!accessToken) {
      setLoading(true);
      return;
    }
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data);
      } catch (error) {
        console.error(
          "Failed to fetch user profile, User Not Authenticated:",
          error,
        );
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  //   Check if token exists
  // ↓
  // If exists → get user profile from backend
  // ↓
  // Store user in global

  const updateUser = (userData) => {
    setUser(userData);
    if (userData.token) {
      localStorage.setItem("token", userData.token); // save token on login/signup
    } //to save token on update
    setLoading(false);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
