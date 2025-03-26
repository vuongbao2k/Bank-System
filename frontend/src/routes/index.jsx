import { Routes, Route, Navigate } from 'react-router-dom';
import LayoutDefault from "../layout/LayoutDefault";
import LayoutAdmin from "../layout/LayoutAdmin";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import Logout from '../pages/Logout';
import ProtectedRoute from "../components/ProtectedRoute";
import AdminRoute from '../components/AdminRoute';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import UserManagementPage from '../pages/UserManagementPage';


export const routes = [
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "logout",
    element: <Logout />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "profile",
            element: <DashboardPage />,
          },
        ]
      }
    ]
  },
  {
    element: <AdminRoute />,
    children: [
      {
        element: <LayoutDefault />,
        children: [
          {
            path: "/admin",
            element: <UserManagementPage />,
          },
        ]
      }
    ]
  }
]
