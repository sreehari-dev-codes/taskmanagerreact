import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Header() {
    
   const userInfo= localStorage.getItem("userInfo")
     
    // console.log(userId);
    const navigate = useNavigate();

    const logout = () => {
        Cookies.remove("token");
        localStorage.clear("userInfo");
        navigate("/login");
    };

    return (
      <div className="main-container">
        <div className="header-flex">
          <div className="brand-name">
            <h3 style={{ color: "#e197dc" }}>
              taskflow <i class="fa-solid fa-list-check"></i>
            </h3>
          </div>

          
          <div className="log-sign">
            {userInfo ? (
              <div style={{ display: "flex" }}>
                <button className="link" onClick={logout}>
                  Log Out
                </button>
              </div>
            ) : (
              <>
                <Link className="link" to="/signup">
                  Sign Up
                </Link>
                <Link className="link" to="/login">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    );
}

export default Header;
