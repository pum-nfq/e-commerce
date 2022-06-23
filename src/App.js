import { LoadingOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';
import { BackTop, Button, ConfigProvider, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { Outlet, Route, Routes } from 'react-router-dom';

import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import AdminPage from './pages/AdminPage/AdminPage';
import DetailProductPage from './pages/DetailProductPage/DetailProductPage';
import HomePage from './pages/HomePage/HomePage';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import ProductPage from './pages/ProductPage/ProductPage';

ConfigProvider.config({
  theme: {
    primaryColor: '#000',
  },
});

function App() {
  const loading = useSelector((state) => state.product.loading);
  return (
    <>
      <BackTop>
        <Button
          size="large"
          shape="circle"
          type="primary"
          className="back-top"
          icon={<VerticalAlignTopOutlined />}
        />
      </BackTop>
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
