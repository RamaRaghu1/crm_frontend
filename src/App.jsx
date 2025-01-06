import "./App.css";
import { Outlet } from "react-router-dom";
// import { Custom } from "./main";
import Protected from "./utils/userProtected";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./redux/store.js";

 const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Outlet />
    
    </>
  );
};
export default App;