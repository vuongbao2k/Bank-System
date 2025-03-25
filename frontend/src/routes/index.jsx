import { Routes, Route, Navigate } from 'react-router-dom';
import LayoutDefault from "../layout/LayoutDefault";
import LayoutAdmin from "../layout/LayoutAdmin";  // Nếu có trang admin
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import Logout from '../pages/Logout';
import ProtectedRoute from "../components/ProtectedRoute";
import RegisterPage from '../pages/RegisterPage';


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
      }
    ]
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <LayoutAdmin />,
        children: [
          {
            path: "dashboard",
            element: <Home />,
          },
        ]
      }
    ]
  }
]
