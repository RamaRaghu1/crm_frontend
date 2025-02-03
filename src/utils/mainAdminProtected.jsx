import React, { useEffect, useMemo } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const MainAdminRoute = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const isAdmin = useMemo(() => user && user.isAdmin, [user]);

    useEffect(() => {
        if (!isAdmin) {
            navigate("/");
        }
    }, [isAdmin, navigate]);

    return isAdmin ? <Outlet /> : null;
};

export default MainAdminRoute;
