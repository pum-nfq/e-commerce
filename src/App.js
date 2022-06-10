import { Routes, Route, Outlet } from "react-router-dom";
import "antd/dist/antd.min.css";
import "./general.scss";

import MainLayout from "./Layouts/MainLayout/MainLayout";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

function App() {
    return (
        <div className="app">
            <Routes>
                <Route
                    path="/"
                    element={
                        <MainLayout />
                    }
                >
                    <Route index element={"home"} />
                    <Route path="product" element={"product-page"} />
                    <Route path="admin" element={"admin"} />
                    <Route path="detail/*" element={"detail"} />
                </Route>

                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default App;
