import "./App.css";

import { Outlet } from "react-router-dom";
import { Custom } from "./main";

import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const tokenexpired = () => {
  let token = localStorage.getItem("accessToken");
if(token===null || token===undefined){
  return false;
}
  let decodedToken = jwtDecode(token);
  let currentDate = new Date();
console.log("_____",decodedToken.exp * 1000 < currentDate.getTime() ? false : true)
  return decodedToken.exp * 1000 < currentDate.getTime() ? false : true;
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
  return tokenexpired() ? <App /> : <Navigate to={"/login"} />;
};

export default App;
