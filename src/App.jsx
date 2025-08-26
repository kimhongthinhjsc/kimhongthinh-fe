import Auth from "./routers/Auth";
import ScrollToTop from "~/components/ScrollToTop/ScrollToTop";
import { LoadingProvider } from "./context/LoadingContext";
function App() {
  return (
    <LoadingProvider>
      <ScrollToTop />
      <Auth />
    </LoadingProvider>
  );
}
export default App;
