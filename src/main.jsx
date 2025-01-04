import { createRoot } from "react-dom/client";
import "./index.css";

import store from "./redux/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

import { useLoadUserQuery } from "./redux/features/api/apiSlice.js";
import { router } from "./router.jsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


export const Custom = ({ children }) => {


const navigate=useNavigate();


  const { isLoading, error, data } = useLoadUserQuery({});

useEffect(()=>{
  if(error && !data.success){
    if (error) {
      const errorMessage = error;
      toast.error(errorMessage.message)
     navigate("/login")
  }
  }
},[error, data])


  return <>{isLoading ? <h1>Loading....</h1> : <>{children}</>}</>;
};




const root = createRoot(document.getElementById("root"));

root.render( <Provider store={store}>
  <Toaster position="top-center" reverseOrder={false} />
  <RouterProvider router={router} />
</Provider>);
