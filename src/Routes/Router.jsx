import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Coverage from "../Pages/Coverage";
import Rider from "../Pages/Rider";
import PrivateRoute from "./PrivateRoute";

export const Router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "/rider",
                element: <PrivateRoute>
                    <Rider />
                </PrivateRoute>
    
            },
            {
                path: "/coverage",
                element: <Coverage />,
                loader: () => fetch('/json/warehouses.json')
            },
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: '/auth/login',
                element: <Login />
            },
            {
                path: '/auth/register',
                element: <Register />
            },
        ]
    }
])