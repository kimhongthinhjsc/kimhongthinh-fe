import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import AuthRoute from "~/components/AuthRoute/AuthRoute";

const LoginAdmin = lazy(() => import("../pages/admin/LoginAdmin/LoginAdmin"));
const DashboardLayout = lazy(() =>
  import("../pages/admin/Dashboard/DashboardLayout")
);
const ForgotPassword = lazy(() =>
  import("../pages/admin/ForgotPassword/ForgotPassword")
);
const ResetPassword = lazy(() =>
  import("../pages/admin/ResetPassword/ResetPassword")
);
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

export default function AuthAdmin() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <AuthRoute>
            <Suspense fallback={<div></div>}>
              <LoginAdmin />
            </Suspense>
          </AuthRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <AuthRoute>
            <Suspense fallback={<div></div>}>
              <ForgotPassword />
            </Suspense>
          </AuthRoute>
        }
      />
      <Route
        path="/reset-password/:token"
        element={
          <AuthRoute>
            <Suspense fallback={<div></div>}>
              <ResetPassword />
            </Suspense>
          </AuthRoute>
        }
      />
      <Route
        path="/dashboard/*"
        element={
          <AuthRoute>
            <Suspense fallback={<div></div>}>
              <DashboardLayout />
            </Suspense>
          </AuthRoute>
        }
      />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}
