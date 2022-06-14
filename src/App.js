import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import ProductPage from "./pages/ProductPage/ProductPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import DetailProductPage from "./pages/DetailProductPage/DetailProductPage";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Outlet />
              <Footer />
            </>
          }
        >
          <Route index element={<div>home</div>} />
          <Route path="product" element={<ProductPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="detail/:id" element={<DetailProductPage />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
