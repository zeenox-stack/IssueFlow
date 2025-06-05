import { RouteObject, Navigate } from "react-router-dom";
import Dashboard from "../Features/dashboard/Dashboard";
import ProjectRoutes from "./projectRoutes";
import IssueRoutes from "./issueRoutes";

const MainRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to={"/dashboard"} replace />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  ...ProjectRoutes,
  ...IssueRoutes,
];

export default MainRoutes;
