import "./App.css";

import { Outlet } from "react-router-dom";
import { Custom } from "./main";

import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Protected from "./utils/userProtected";
import { RouterProvider } from "react-router-dom";
import {router} from "./router"
// const isAuthenticated = () => {
//   let token = localStorage.getItem("accessToken");

//   console.log("token_________", token);
//   if (token === null || token === undefined) {
//     return false;
//   }
//   let decodedToken = jwtDecode(token);
//   let currentDate = new Date();
//   console.log(
//     "_____",
//     decodedToken.exp * 1000 < currentDate.getTime() ? false : true
//   );
//   console.log("decodedToken.exp____", decodedToken.exp)
//   return decodedToken.exp * 1000 < currentDate.getTime() ? false : true;
// };



export const AppLayout=()=>{
  return (
    <>
     <Protected>
      <Custom>
        <Outlet />
      </Custom>
      </Protected>
    </>
  )
}


function App() {
  return <RouterProvider router={router} />
}



export default App;
