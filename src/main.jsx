import { createRoot } from "react-dom/client";
import "./index.css";
import store from "./redux/store.js";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { useLoadUserQuery } from "./redux/features/api/apiSlice.js";
import Login from "./pages/Login.jsx";
import ApplyLeave from "./pages/ApplyLeave.jsx";
import Attendance from "./components/Project/Attendance.jsx";
import Employees from "./pages/Employees.jsx";
import AddEmployee from "./components/Project/AddEmployee.jsx";
import Profile from "./pages/Profile.jsx";
import AppliedLeaves from "./pages/AppliedLeaves.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import EmployeeProfileForm from "./components/UpdateProfile/EmployeeProfileForm.jsx";

import PendingLeaves from "./components/Admin/PendingLeaves.jsx";
import App from "./App.jsx";
import ProjectManagement from "./pages/ProjectManagement.jsx";
import ProjectDetails from "./pages/ProjectDetails.jsx";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import Protected from "./utils/userProtected.jsx";
import AdminRoute from "./utils/adminProtected.jsx";
import { EmployeeTasks } from "./pages/EmployeeTasks.jsx";
// import ViewTask from "./components/task/ViewTask.jsx";

// export const Custom = ({ children }) => {

//   const { isLoading } = useLoadUserQuery({});

//   return <>{isLoading ? <h1>Loading....</h1> : <>{children}</>}</>;
// };



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />

      <Route path="" element={<Protected />}>
        <Route path="/" element={<Dashboard />} />
       <Route path="/leave" element={<ApplyLeave />} />
        <Route path="/applied-leaves/:id" element={<AppliedLeaves />} />
       <Route path="/edit-profile/:id" element={<EmployeeProfileForm />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/project-management/:id" element={<ProjectManagement />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/tasks/:id" element={<EmployeeTasks />} />
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/users" element={<Employees />} />
        <Route path="/pending-leaves" element={<PendingLeaves />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/add-employee" element={<AddEmployee />} />
      
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
