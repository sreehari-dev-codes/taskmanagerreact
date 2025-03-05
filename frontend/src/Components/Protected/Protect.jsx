import { useNavigate } from "react-router-dom";


const ProtectedRoute = ({ element, requiredRole }) => {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem("userInfo")); 
    if (!userInfo || !userInfo.token) {
        
        navigate("/login");
        return null;
    }

    if (requiredRole && userInfo.role !== requiredRole) {
       
        navigate("/");
        return null;
    }

    return element; 
};

export default ProtectedRoute;
