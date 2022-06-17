import { Outlet, Route, Routes } from 'react-router-dom';

import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar';
import AdminPage from './pages/AdminPage/AdminPage';
import DetailProductPage from './pages/DetailProductPage/DetailProductPage';
import HomePage from './pages/HomePage/HomePage';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import ProductPage from './pages/ProductPage/ProductPage';

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
          <Route index element={<HomePage />} />
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
