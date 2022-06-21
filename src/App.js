import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import 'antd/dist/antd.min.css';
import { Footer } from 'antd/lib/layout/layout';
import { useSelector } from 'react-redux';
import { Outlet, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import AdminPage from './pages/AdminPage/AdminPage';
import DetailProductPage from './pages/DetailProductPage/DetailProductPage';
import HomePage from './pages/HomePage/HomePage';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import ProductPage from './pages/ProductPage/ProductPage';

function App() {
  const loading = useSelector((state) => state.product.loading);
  return (
    <>
      <Spin
        indicator={<LoadingOutlined spin className="spiner__icon" />}
        className="spiner"
        spinning={loading}
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
              <Route path="detail/:id" element={<DetailProductPage />} />
              <Route path="cart" element={<PaymentPage />} />
            </Route>
            <Route path="admin" element={<AdminPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </Spin>
    </>
  );
}

export default App;
