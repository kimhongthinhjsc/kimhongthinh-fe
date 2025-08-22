// eslint-disable-next-line no-unused-vars
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";


const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const Introduce = lazy(() => import("../pages/Introduce/Introduce"));
const ProductsPage = lazy(() => import("../pages/ProductsPage/ProductsPage"));
const ServicesPage = lazy(() => import("../pages/ServicesPage/ServicesPage"));
const Contact = lazy(() => import("../pages/Contact/Contact"));
const NewsPage = lazy(() => import("../pages/NewsPage/NewsPage"));
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
const DashboardLayout = lazy(() => import("../pages/admin/Dashboard/DashboardLayout"));
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
          <Suspense fallback={<div></div>}>
            <LoginAdmin />
          </Suspense>
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
          <Suspense fallback={<div></div>}>
            <DashboardLayout />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default Auth;
