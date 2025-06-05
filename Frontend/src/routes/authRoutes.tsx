import { RouteObject } from "react-router-dom";
import Auth from "../Features/auth/Auth"; 
import Login from "../Features/login/Login";

const AuthRoutes: RouteObject[] = [
    {
        path: "/auth", 
        element: <Auth />, 
        children: [{
            path: "login", element: <Login />
        }]
    },
]; 

export default AuthRoutes;