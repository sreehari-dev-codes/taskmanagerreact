import Header from "../Header/Header";
import Hero from "../Hero/Hero";
import { Routes, Route, useLocation } from "react-router-dom";
import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";
import Error from "../Error/Error";
import User from "../User/User";
import Admin from "../Admin/Admin";
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/userD/User";
import { useEffect } from "react";
import axios from "axios";
import ProtectedRoute from "../Protected/Protect";

function Main() {
  const location = useLocation();
  const API_URL = "http://localhost:3005";

  const dispatch = useDispatch();
  useEffect(() => {
    async function userData() {
      const UserInfo = localStorage.getItem("userInfo");

      if (UserInfo) {
        try {
          const user = JSON.parse(UserInfo);
          const token = user.token;
          console.log(token);

          const response = await axios.get(`${API_URL}/api/user/userDetails`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          console.log(response.data);
          dispatch(setUser(response.data.user));
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      } else {
        console.error("User information not found in localStorage.");
      }
    }
    userData();
  }, []);

  return (
    <div>
      {location.pathname !== "/admin" && <Header />}
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error />} />

        {/* Protected admin route */}
        <Route
          path="/admin"
          element={<ProtectedRoute element={<Admin />} requiredRole="admin" />}
        />

        {/* Protected user profile route */}
        <Route
          path="/userProfile"
          element={<ProtectedRoute element={<User />} requiredRole={"user"} />}
        />
      </Routes>
    </div>
  );
}

export default Main;
