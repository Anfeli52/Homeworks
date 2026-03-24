import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Contexts/AuthProvider";

function ProtectedRout() {
    const { user } = useAuth();
    if(!user){
        return <Navigate to="/login" replace />
    }

    return <Outlet/>
}

export default ProtectedRout;