import Login from "./pages/Login.jsx";
import ApplyLeave from "./pages/ApplyLeave.jsx";
import Attendance from "./components/Project/Attendance.jsx";
import Employees from "./pages/Employees.jsx";
import AddEmployee from "./components/Project/AddEmployee.jsx";
import Profile from "./pages/Profile.jsx";
import AppliedLeaves from "./pages/AppliedLeaves.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import EmployeeProfileForm from "./components/UpdateProfile/EmployeeProfileForm.jsx";
import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import PendingLeaves from "./components/Admin/PendingLeaves.jsx";
import { ProtectedRoute } from "./App.jsx";
import ProjectManagement from "./pages/ProjectManagement.jsx";
import CreateProject from "./components/Project/CreateProject.jsx";
import Board from "./components/Project/ProjectColumn.jsx";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute/>,
      children: [
        {
          path: "/",
          element: <Employees />,
        },
        {
          path: "/leave",
          element: <ApplyLeave />,
        },
        {
          path: "/applied-leaves/:id",
          element: <AppliedLeaves />,
        },
        {
          path: "/pending-leaves",
          element: <PendingLeaves />,
        },
        {
          path: "/attendance",
          element: <Attendance />,
        },
        {
          path: "/dashboard",
          element: <Dashboard/>,
        },
        {
          path: "/add-employee",
          element: <AddEmployee />,
        },
        {
          path: "/project-management",
          element: <ProjectManagement />,
        },
        {
          path:"/edit-profile/:id",
  element:<EmployeeProfileForm/>
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/create",
          element: <CreateProject />,
        },
        {
          path: "/board",
          element: <Board />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);