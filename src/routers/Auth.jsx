// eslint-disable-next-line no-unused-vars
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import AuthRoute from "~/components/AuthRoute/AuthRoute";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const Introduce = lazy(() => import("../pages/Introduce/Introduce"));
const ProductsPage = lazy(() => import("../pages/ProductsPage/ProductsPage"));
const ServicesPage = lazy(() => import("../pages/ServicesPage/ServicesPage"));
const Contact = lazy(() => import("../pages/Contact/Contact"));
const NewsPage = lazy(() => import("../pages/NewsPage/NewsPage"));
const NewsDetailPage = lazy(() => import("../pages/NewsPage/NewsDetailPage"));
const CareersPage = lazy(() => import("../pages/CareersPage/CareersPage"));
const EventsPage = lazy(() => import("../pages/EventsPage/EventsPage"));
const LoginAdmin = lazy(() => import("../pages/admin/LoginAdmin/LoginAdmin"));
const ProductDetailPage = lazy(() =>
  import("../pages/ProductDetailPage/ProductDetailPage")
);
const ServiceDetailPage = lazy(() =>
  import("../pages/ServiceDetailPage/ServiceDetailPage")
);
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

//Admin
const DashboardLayout = lazy(() =>
  import("../pages/admin/Dashboard/DashboardLayout")
);
const ForgotPassword = lazy(() =>
  import("../pages/admin/ForgotPassword/ForgotPassword")
);
const ResetPassword = lazy(() =>
  import("../pages/admin/ResetPassword/ResetPassword")
);
const Auth = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<div></div>}>
            <HomePage />
          </Suspense>
        }
      />
      <Route
        path="/gioi-thieu"
        element={
          <Suspense fallback={<div></div>}>
            <Introduce />
          </Suspense>
        }
      />
      <Route
        path="/san-pham"
        element={
          <Suspense fallback={<div></div>}>
            <ProductsPage />
          </Suspense>
        }
      />
      <Route
        path="/dich-vu"
        element={
          <Suspense fallback={<div></div>}>
            <ServicesPage />
          </Suspense>
        }
      />
      <Route
        path="/lien-he"
        element={
          <Suspense fallback={<div></div>}>
            <Contact />
          </Suspense>
        }
      />
      <Route
        path="/tin-tuc"
        element={
          <Suspense fallback={<div></div>}>
            <NewsPage />
          </Suspense>
        }
      />
      <Route
        path="/tin-tuc/:id"
        element={
          <Suspense fallback={<div></div>}>
            <NewsDetailPage />
          </Suspense>
        }
      />
      <Route
        path="/tuyen-dung"
        element={
          <Suspense fallback={<div></div>}>
            <CareersPage />
          </Suspense>
        }
      />

      <Route
        path="/su-kien"
        element={
          <Suspense fallback={<div></div>}>
            <EventsPage />
          </Suspense>
        }
      />

      <Route
        path="/san-pham/:id"
        element={
          <Suspense fallback={<div></div>}>
            <ProductDetailPage />
          </Suspense>
        }
      />
      <Route
        path="/dich-vu/:id"
        element={
          <Suspense fallback={<div></div>}>
            <ServiceDetailPage />
          </Suspense>
        }
      />

      {/* Admin */}
      <Route
        path="/admin/login"
        element={
          <AuthRoute>
            <Suspense fallback={<div></div>}>
              <LoginAdmin />
            </Suspense>
          </AuthRoute>
        }
      />
      <Route
        path="/admin/forgot-password"
        element={
          <AuthRoute>
            <Suspense fallback={<div></div>}>
              <ForgotPassword />
            </Suspense>
          </AuthRoute>
        }
      />
      <Route
        path="/admin/reset-password/:token"
        element={
          <AuthRoute>
            <Suspense fallback={<div></div>}>
              <ResetPassword />
            </Suspense>
          </AuthRoute>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<div></div>}>
            <NotFoundPage />
          </Suspense>
        }
      />

      <Route
        path="/admin/dashboard/*"
        element={
          <AuthRoute>
            <Suspense fallback={<div></div>}>
              <DashboardLayout />
            </Suspense>
          </AuthRoute>
        }
      />
    </Routes>
  );
};

export default Auth;
