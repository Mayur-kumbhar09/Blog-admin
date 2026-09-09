import { Navigate, Outlet } from "react-router-dom";
export default () =>
  localStorage.getItem("token") ? <Outlet /> : <Navigate to="/login" />;
