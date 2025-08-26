// src/components/AuthRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { checkAuth } from "~/services/adminAPI";

export default function AuthRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);
  const accessToken = localStorage.getItem("accessToken");
  const location = useLocation();
  useEffect(() => {
    const verifyAuth = async () => {
      if (accessToken) {
        try {
          await checkAuth(); // gọi API check token
          setIsAuth(true);
        } catch (error) {
          setIsAuth(false);
        }
      } else {
        setIsAuth(false);
      }
    };
    verifyAuth();
  }, [accessToken]);

  if (isAuth === null) {
    return children; // bạn thay bằng spinner nếu thích
  }

  // Nếu route private mà chưa auth -> login
  if (!isAuth && location.pathname.startsWith("/admin/dashboard")) {
    return <Navigate to="/admin/login" replace />;
  }

  // Nếu route public (login/register) mà đã auth -> dashboard
  if (isAuth && location.pathname === "/admin/login") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
}
