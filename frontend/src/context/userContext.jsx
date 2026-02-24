// src/context/userContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const storedUser = localStorage.getItem("user");

  //   if (token && storedUser) setUser(JSON.parse(storedUser));

  //   if (token) {
  //     const fetchUser = async () => {
  //       try {
  //         const res = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
  //         setUser(res.data);
  //         localStorage.setItem("user", JSON.stringify(res.data));
  //       } catch (err) {
  //         console.error("Profile fetch failed:", err);
  //         clearUser();
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchUser();
  //   } else {
  //     setLoading(false);
  //   }
  // }, []);
useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    setLoading(false); // Important
    return;
  }

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      console.error("Profile fetch failed:", err);
      clearUser();
    } finally {
      setLoading(false);
    }
  };

  fetchUser();
}, []);
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    if (userData.token) localStorage.setItem("token", userData.token);
    setLoading(false);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;