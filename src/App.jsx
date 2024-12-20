import './App.css'
import LeaveBalance from './components/Leave/LeaveBalance'
import LeaveForm from './components/Leave/LeaveForm'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import { Custom } from './main'
import Cookie from 'js-cookie';
import { Navigate } from 'react-router-dom'
import {jwtDecode} from "jwt-decode";

export const isAuthenticated = () => {



  const token = localStorage.getItem("accessToken");
  // console.log("kjhghj",token)
  if (!token) {
    return false;
  }
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  } catch (error) {
    console.error("Invalid token", error);
    return false;
  }
};

function App() {
  

  return (
  <>
  <Custom>
  {/* <Navbar/> */}
  <Outlet/>
  </Custom>
  </>
  )
}



export const ProtectedRoute = () => {
  return isAuthenticated() ? <App /> : <Navigate to={"/login"} />;
};




export default App
