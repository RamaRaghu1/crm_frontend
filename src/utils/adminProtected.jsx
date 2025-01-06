import { useNavigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const AdminRoute = () => {
  const { user } = useSelector((state) => state.auth);

const navigate=useNavigate();

useEffect(() => {
    if (!user?.isSuperUser || Object.keys(user).length === 0) {
    
      navigate("/");
    }
  }, [user, navigate]);

 
  return user?.isSuperUser && Object.keys(user).length > 0 ? <Outlet /> : null;


 
};
export default AdminRoute;