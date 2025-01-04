import { createRoot } from "react-dom/client";
import "./index.css";
import store from "./redux/store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { useLoadUserQuery } from "./redux/features/api/apiSlice.js";
import { router } from "./router.jsx";


export const Custom = ({ children }) => {

  const { isLoading } = useLoadUserQuery({});

  return <>{isLoading ? <h1>Loading....</h1> : <>{children}</>}</>;
};

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
   <RouterProvider router={router} />
    <Toaster position="top-center" reverseOrder={false} />

  </Provider>
);
