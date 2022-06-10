import { Routes, Route, Outlet } from "react-router-dom";
import "antd/dist/antd.min.css";
import "./general.scss";

import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import ProductPage from "./pages/ProductPage/ProductPage"

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
                    <Route path="admin" element={"admin"} />
                    <Route path="detail/*" element={"detail"} />
                </Route>

                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default App;
