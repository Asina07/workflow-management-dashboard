// src/pages/Root.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

const Root = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  return user.role === "admin" ? (
    <Navigate to="/admin/dashboard" replace />
  ) : (
    <Navigate to="/user/dashboard" replace />
  );
};

export default Root;