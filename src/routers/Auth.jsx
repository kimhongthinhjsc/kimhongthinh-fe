// eslint-disable-next-line no-unused-vars
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Test = lazy(() =>
  import("../components/TestComponent/TestComponent").then((module) => ({
    default: module.TestComponent,
  }))
);
const NotFoundPage = React.lazy(() =>
  import("../pages/NotFoundPage/NotFoundPage")
);
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const Introduce = lazy(() => import("../pages/Introduce/Introduce"));
const Products = lazy(() => import("../pages/Products/Products"));
const Services = lazy(() => import("../pages/Services/Services"));
const Contact = lazy(() => import("../pages/Contact/Contact"));
const NewsPage = lazy(() => import("../pages/NewsPage/NewsPage"));
const CareersPage = lazy(() => import("../pages/CareersPage/CareersPage"));
const EventsPage = lazy(() => import("../pages/EventsPage/EventsPage"));
const LoginAdmin = lazy(() => import("../pages/admin/LoginAdmin/LoginAdmin"));


//Admin
const Dashboard = lazy(() => import("../pages/admin/Dashboard/Dashboard"));
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
            <Products />
          </Suspense>
        }
      />
      <Route
        path="/dich-vu"
        element={
          <Suspense fallback={<div></div>}>
            <Services />
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
        path="/admin/login"
        element={
          <Suspense fallback={<div></div>}>
            <LoginAdmin />
          </Suspense>
        }
      />

      <Route
        path="/admin/dashboard/*"
        element={
          <Suspense fallback={<div></div>}>
            <Dashboard />
          </Suspense>
        }
      />
    </Routes>
    
  );
};

export default Auth;
