import "./App.css";
import LeaveBalance from "./components/Leave/LeaveBalance";
import LeaveForm from "./components/Leave/LeaveForm";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { Custom } from "./main";
import Cookie from "js-cookie";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const isAuthenticated = () => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp > currentTime) {
   
      const timeToExpire = (decodedToken.exp - currentTime) * 1000;
      setTimeout(() => {
        console.warn("Token expired, redirecting to login.");
        localStorage.clear();
        window.location.href = "/login"; 
      }, timeToExpire);

      return true; 
    }

   
    localStorage.removeItem("accessToken");
    
    return false;
  } catch (error) {
    console.error("Invalid token", error);
    localStorage.clear();
    return false;
  }
};

function App() {
  return (
    <>
      <Custom>
       
        <Outlet />
      </Custom>
    </>
  );
}

export const ProtectedRoute = () => {
  return isAuthenticated() ? <App /> : <Navigate to={"/login"} />;
};

export default App;
