import { useRoutes } from "react-router-dom"
import AuthRoutes from "./authRoutes"
import MainRoutes from "./mainRoutes"


const AppRoutes = () => {
    return useRoutes([
        ...AuthRoutes, 
        ...MainRoutes
    ]); 

};

export default AppRoutes;