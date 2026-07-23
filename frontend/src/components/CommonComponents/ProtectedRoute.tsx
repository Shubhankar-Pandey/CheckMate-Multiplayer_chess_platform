import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {

    const { user }  = useSelector((state: any) => state.user);
    
    if (Object.keys(user).length !== 0) {
        return <Outlet />;
    }
    
    return <Navigate to="/signin" replace />;
}