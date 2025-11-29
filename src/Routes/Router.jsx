import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Coverage from "../Pages/Coverage";
import Rider from "../Pages/Rider";
import PrivateRoute from "./PrivateRoute";
import SendParcel from "../Pages/SendParcel";
import DashboardLayout from "../Layouts/DashboardLayout";
import MyParcels from "../Pages/Dashboard/MyParcels";
import Payment from "../Pages/Dashboard/Payment";
import PaymentSuccess from "../Pages/Dashboard/PaymentSuccess";
import PaymentCancel from "../Pages/Dashboard/PaymentCancel";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import ApproveRiders from "../Pages/Dashboard/ApproveRiders";
import UsersManagement from "../Pages/Dashboard/UsersManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../Pages/Dashboard/AssignRiders";
import RiderRoutes from "./RiderRoutes";
import AssignedDeliveries from "../Pages/Dashboard/AssignedDeliveries";

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
                </PrivateRoute>,
                loader: () => fetch('/json/warehouses.json')

            },
            {
                path: "/send-parcel",
                element: <PrivateRoute>
                    <SendParcel />
                </PrivateRoute>,
                loader: () => fetch('/json/warehouses.json')
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
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <DashboardLayout />
        </PrivateRoute>,
        children: [
            {
                path: '',
                element: <MyParcels />
            },
            {
                path: '/dashboard/my-parcels',
                element: <MyParcels />
            },
            {
                path: '/dashboard/payment/:parcelId',
                element: <Payment />
            },
            {
                path: '/dashboard/payment-success',
                element: <PaymentSuccess />
            },
            {
                path: '/dashboard/payment-cancel',
                element: <PaymentCancel />
            },
            {
                path: '/dashboard/payment-history',
                element: <PaymentHistory />
            },
            // rider routes
            {
                path: '/dashboard/assigned-deliveries',
                element: <RiderRoutes><AssignedDeliveries/></RiderRoutes>
            },
            // admin routes
            {
                path: '/dashboard/approve-riders',
                element:
                    <AdminRoute>
                        <ApproveRiders />
                    </AdminRoute>
            },
            {
                path: '/dashboard/users-management',
                element: <AdminRoute><UsersManagement /></AdminRoute>
            },
            {
                path: '/dashboard/assign-riders',
                element: <AdminRoute><AssignRiders /></AdminRoute>
            },
        ]
    }
])