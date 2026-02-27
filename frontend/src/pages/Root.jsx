// src/pages/Root.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { ClipLoader } from "react-spinners";

const Root = () => {
  const { user, loading } = useContext(UserContext);

  {
    loading && (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return user.role === "admin" ? (
    <Navigate to="/admin/dashboard" replace />
  ) : (
    <Navigate to="/user/dashboard" replace />
  );
};

export default Root;
