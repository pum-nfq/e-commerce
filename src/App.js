import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import 'antd/dist/antd.min.css';
import { Suspense, lazy } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

const Footer = lazy(() => import('./components/Footer/Footer'));
const Navbar = lazy(() => import('./components/Navbar'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const AdminPage = lazy(() => import('./pages/AdminPage/AdminPage'));
const DetailProductPage = lazy(() =>
  import('./pages/DetailProductPage/DetailProductPage'),
);
const PageNotFound = lazy(() => import('./pages/PageNotFound/PageNotFound'));
const ProductPage = lazy(() => import('./pages/ProductPage/ProductPage'));
const PaymentPage = lazy(() => import('./pages/PaymentPage/PaymentPage'));

function App() {
  return (
    <Suspense
      fallback={
        <Spin
          indicator={<LoadingOutlined spin className="spiner__icon" />}
          className="spiner"
        />
      }
    >
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
            <Route path="cart" element={<PaymentPage />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
