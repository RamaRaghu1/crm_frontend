import "./App.css";
import { Outlet } from "react-router-dom";
// import { Custom } from "./main";
import Protected from "./utils/userProtected";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import ScrollToTop from "./utils/ScrollToTop.jsx";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Toaster position="top-center" reverseOrder={false} />
      <Outlet />
    </>
  );
};
export default App;
