
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Protected() {
  const expirationTime = localStorage.getItem("expirationTime");

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user || Object.keys(user).length === 0 ||   new Date().getTime() > expirationTime) {
    
      navigate("/login");
    }
  }, [user, navigate]);

 
  return user && Object.keys(user).length > 0 ? <Outlet /> : null;
}
