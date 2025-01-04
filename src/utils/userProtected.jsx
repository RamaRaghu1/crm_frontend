import { Navigate } from "react-router-dom";
import useAuth from "./userAuth";



export default function Protected({children}){
    const isAuthenticated = useAuth();

    return isAuthenticated ? children : <Navigate to='/login'/>
}