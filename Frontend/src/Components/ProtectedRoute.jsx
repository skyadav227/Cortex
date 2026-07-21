import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getProfile } from "../Services/profile";
import LoadingScreen from "./LoadingScreen";

export default function ProtectedRoute() {

  const [loading, setLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkUser = async () => {

      try {
        const user = await getProfile();
        setIsAuthenticated(true);
      }

      catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsAuthenticated(false);

      }

      finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  if (loading) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}