import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  return (
    <>
      {(token && role == 'ADMIN') ? (<Outlet />) : (<Navigate to="/" />)}
    </>
  )
}

export default AdminRoute;