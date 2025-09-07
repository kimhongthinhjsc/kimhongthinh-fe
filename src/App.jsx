import Auth from "./routers/Auth";
import AuthAdmin from "./routers/AuthAdmin";
import ScrollToTop from "~/components/ScrollToTop/ScrollToTop";
import { LoadingProvider } from "./context/LoadingContext";
import FramePage from "./components/FramePage/FramePage";
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";

function App() {
  return (
    <LoadingProvider>
      <ScrollToTop />
      <Routes>
        {/* Frontend routes */}
        <Route
          path="/*"
          element={<FramePage />} // FramePage luôn bọc ngoài
        >
          <Route
            index
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Auth />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Auth />
              </Suspense>
            }
          />
        </Route>

        {/* Admin routes */}
        <Route path="/admin/*" element={<AuthAdmin />} />
      </Routes>
    </LoadingProvider>
  );
}
export default App;
