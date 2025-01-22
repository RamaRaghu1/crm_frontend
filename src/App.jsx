import "./App.css";
import { Outlet } from "react-router-dom";
// import { Custom } from "./main";
import Protected from "./utils/userProtected";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import ScrollToTop from "./utils/ScrollToTop.jsx";
import { Sidebar } from "./components/Sidebar/Sidebar.jsx";
import { useLoadUserQuery } from "./redux/features/api/apiSlice.js";

export const Custom = ({ children }) => {
  const { data, isLoading } = useLoadUserQuery({});

  return <>{isLoading ? <h1>Loading....</h1> : <>{children}</>}</>;
};
const App = () => {
  return (
    <>
      <ScrollToTop />
      <Toaster position="top-center" reverseOrder={false} />

      {/* <Custom>
        <Sidebar data={data?.data} />
      </Custom> */}
      {/* <main className="lg:ml-64 min-h-screen p-8"> */}
        <Outlet />
      {/* </main> */}
    </>
  );
};
export default App;
