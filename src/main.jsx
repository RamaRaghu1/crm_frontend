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
import AddTeam from "./pages/AddTeam.jsx";
import MainAdminRoute from "./utils/mainAdminProtected.jsx";
import AttendanceData from "./components/Project/AttendanceData.jsx";
import SendMail from "./pages/SendMail.jsx";
import Holiday from "./pages/Holiday.jsx";
import Announcement from "./pages/Announcement.jsx";
import AllHolidays from "./pages/Admin/AllHolidays.jsx";
import AllAnnouncements from "./pages/Admin/AllAnnouncements.jsx";
import EditHoliday from "./pages/Admin/EditHoliday.jsx";
import EditAnnouncement from "./pages/Admin/EditAnnouncement.jsx";



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />

      <Route path="" element={<Protected />}>
        <Route path="/" element={<Dashboard />} />
       <Route path="/leave/:id" element={<ApplyLeave />} />
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
        <Route path="/attendance-details" element={<AttendanceData/>} />
        <Route path="/add-employee" element={<AddEmployee />} />
       
      
      </Route>
      <Route path="" element={<MainAdminRoute/>}>
      <Route path="/team" element={<AddTeam />} />
      <Route path="/send-mail" element={<SendMail />} />
      <Route path="/holiday" element={<Holiday />} />
      <Route path="/announcement" element={<Announcement />} />
      <Route path="/all-holiday" element={<AllHolidays />} />
      <Route path="/edit-holiday/:id" element={<EditHoliday />} />
      <Route path="/all-announcements" element={<AllAnnouncements />} />
      <Route path="/edit-announcement/:id" element={<EditAnnouncement />} />

      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
