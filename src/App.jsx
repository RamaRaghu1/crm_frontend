import "./App.css";
import { Outlet } from "react-router-dom";
// import { Custom } from "./main";
import Protected from "./utils/userProtected";




export const AppLayout=()=>{
  return (
    <>
     <Protected>
      {/* <Custom> */}
        <Outlet />
      {/* </Custom> */}
      </Protected>
    </>
  )
}






