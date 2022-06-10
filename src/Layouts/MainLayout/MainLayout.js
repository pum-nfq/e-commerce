import React from "react";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <>
            <div>
                <div>Header</div>
                <Outlet />
                <div>Footer</div>
            </div>
        </>
    );
}
