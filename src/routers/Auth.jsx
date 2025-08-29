import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy load các page
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const Introduce = lazy(() => import("../pages/Introduce/Introduce"));
const ProductsPage = lazy(() => import("../pages/ProductsPage/ProductsPage"));
const ProductDetailPage = lazy(() =>
  import("../pages/ProductDetailPage/ProductDetailPage")
);
const ServicesPage = lazy(() => import("../pages/ServicesPage/ServicesPage"));
const ServiceDetailPage = lazy(() =>
  import("../pages/ServiceDetailPage/ServiceDetailPage")
);
const Contact = lazy(() => import("../pages/Contact/Contact"));
const NewsPage = lazy(() => import("../pages/NewsPage/NewsPage"));
const NewsDetailPage = lazy(() => import("../pages/NewsPage/NewsDetailPage"));
const CareersPage = lazy(() => import("../pages/CareersPage/CareersPage"));
const CareerDetailPage = lazy(() => import("../pages/CareersPage/CareerDetail"));
const EventsPage = lazy(() => import("../pages/EventsPage/EventsPage"));
const EventDetailPage = lazy(() => import("../pages/EventsPage/EventDetailPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

export default function Auth() {
  return (
    <Routes>
      {/* Routes frontend - sẽ nằm trong FramePage */}
      <Route
        index
        element={
          <Suspense fallback={<div></div>}>
            <HomePage />
          </Suspense>
        }
      />
      <Route
        path="gioi-thieu"
        element={
          <Suspense fallback={<div></div>}>
            <Introduce />
          </Suspense>
        }
      />
      <Route
        path="san-pham"
        element={
          <Suspense fallback={<div></div>}>
            <ProductsPage />
          </Suspense>
        }
      />
      <Route
        path="san-pham/:id"
        element={
          <Suspense fallback={<div></div>}>
            <ProductDetailPage />
          </Suspense>
        }
      />
      <Route
        path="dich-vu"
        element={
          <Suspense fallback={<div></div>}>
            <ServicesPage />
          </Suspense>
        }
      />
      <Route
        path="dich-vu/:id"
        element={
          <Suspense fallback={<div></div>}>
            <ServiceDetailPage />
          </Suspense>
        }
      />
      <Route
        path="lien-he"
        element={
          <Suspense fallback={<div></div>}>
            <Contact />
          </Suspense>
        }
      />
      <Route
        path="tin-tuc"
        element={
          <Suspense fallback={<div></div>}>
            <NewsPage />
          </Suspense>
        }
      />
      <Route
        path="tin-tuc/:id"
        element={
          <Suspense fallback={<div></div>}>
            <NewsDetailPage />
          </Suspense>
        }
      />
      <Route
        path="tuyen-dung"
        element={
          <Suspense fallback={<div></div>}>
            <CareersPage />
          </Suspense>
        }
      />
      <Route
        path="tuyen-dung/:id"
        element={
          <Suspense fallback={<div></div>}>
            <CareerDetailPage />
          </Suspense>
        }
      />
      <Route
        path="su-kien"
        element={
          <Suspense fallback={<div></div>}>
            <EventsPage />
          </Suspense>
        }
      />
      <Route
        path="su-kien/:id"
        element={
          <Suspense fallback={<div></div>}>
            <EventDetailPage />
          </Suspense>
        }
      />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}

