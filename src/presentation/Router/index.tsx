import { RouterProvider, createBrowserRouter } from "react-router-dom";
import  LoginPage  from "../UI/Pages/LoginPage";
import Layout from "@/presentation/UI/Layout/Layout";
import ProtectedRoutes from "./ProtectedRoutes";
import DashboardPage from "../UI/Pages/DashboardPage";
import SignUpPage from "../UI/Pages/SignUpPage";
// import HomePage from "@/presentation/UI/Pages/HomePage";
// import DashboardPage from "../UI/Pages/DashboardPage";
// import ProtectedRoutes from "./ProtectedRoutes";

// eslint-disable-next-line react-refresh/only-export-components
export const routesConfig = [
  {
    path: "/",
    element: <Layout />,
    children: [
      // { index: true, element: <HomePage /> },
      { path:"/signup", element: <SignUpPage /> },
      { path: "/login", element: <LoginPage /> },
      {
        element: <ProtectedRoutes />,
        children: [{ path: "/dashboard", element: <DashboardPage /> }],
      },
    ],
  },
];
export const router = createBrowserRouter(routesConfig);

const RouteProvider = () => {
  return <RouterProvider router={router} />;
};

export default RouteProvider;
