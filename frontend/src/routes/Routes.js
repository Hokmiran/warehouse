import ForgotPassword from "../pages/auth/ForgotPassword";
import Login from "../pages/auth/Login";
import Reset from "../pages/auth/ResetPassword";
import Home from "../pages/home/Home";


export const routes = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword />,
    },
    {
        path: "/reset-password/:resetToken",
        element: <Reset />,
    },
    {
        path: "/",
        element: <Home />,
    }
];