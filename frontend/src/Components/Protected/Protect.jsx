import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // In case you need to access Redux state

const ProtectedRoute = ({ element, requiredRole }) => {
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem("userInfo")); // Get user info from localStorage

    if (!userInfo || !userInfo.token) {
        // If no user info or token, redirect to login
        navigate("/login");
        return null;
    }

    if (requiredRole && userInfo.role !== requiredRole) {
        // If role mismatch (optional), redirect to a forbidden page or home
        navigate("/");
        return null;
    }

    return element; // Render the protected route
};

export default ProtectedRoute;
