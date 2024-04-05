import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const localStorageToken = localStorage.getItem("authToken");
console.log("comp:",localStorageToken)
  return localStorageToken ? <Outlet /> : <Navigate to='/login' replace />;
};

export default ProtectedRoutes;
