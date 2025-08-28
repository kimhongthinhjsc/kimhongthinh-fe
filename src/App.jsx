import { useEffect } from "react";
import Auth from "./routers/Auth";
import AuthAdmin from "./routers/AuthAdmin";
import ScrollToTop from "~/components/ScrollToTop/ScrollToTop";
import { LoadingProvider } from "./context/LoadingContext";
import FramePage from "./components/FramePage/FramePage";
import { Route, Routes } from "react-router-dom";

function App() {

  return (
    <LoadingProvider>
      <ScrollToTop />
      <Routes>
        {/* Frontend routes */}
        <Route
          path="/*"
          element={
            <FramePage>
              <Auth />
            </FramePage>
          }
        />

        {/* Admin routes */}
        <Route path="/admin/*" element={<AuthAdmin />} />
      </Routes>
    </LoadingProvider>
  );
}
export default App;