// import React, { useEffect, useState } from "react";
// import "./Login.scss";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login() {
//     //localhost linkz
//     const navigate = useNavigate();
//     const API_URL = "https://taskmanagerreact-4.onrender.com";
//     const [input, setInput] = useState({ email: "", password: "" });

//     // initilize usestate error setting

//     const [errors, setErrors] = useState({
//         email: "",
//         password: "",
//     });

//     //inputHandle
//     const handleOnChange = (event) => {
//         const inputValue = event.target.value;
//         const inputName = event.target.name;
//         setInput((previous) => {
//             return {
//                 ...previous,
//                 [inputName]: inputValue,
//             };
//         });
//     };

//     // functon to validate form

//     const validate = () => {
//         let valid = true;
//         const newErrors = { email: "", password: "" };

//         if (!input.email) {
//             newErrors.email = "email is required";
//             valid = false;
//         }

//         if (!input.password) {
//             newErrors.password = " password is required";
//             valid = false;
//         }

//         setErrors(newErrors);
//         return valid;
//     };

//     const HandleLoginSubmit = async (event) => {
//         event.preventDefault();

//         if (!validate()) {
//             return;
//         }

//         try {
//             const responce = await axios.post(`${API_URL}/api/user/login`, input, {
//                 headers: { "Content-Type": "application/json" },
//                 withCredentials: true,
//             });

//             console.log("loginUser", responce.data);
//             const userInfo = localStorage.setItem(
//                 "userInfo",
//                 JSON.stringify({ role: responce.data.role, token: responce.data.token })
//             );

//             const storedUserInfo = localStorage.getItem("userInfo");

//             const userRole = JSON.parse(storedUserInfo);
//             if (userRole.role === "admin") {
//                 navigate("/admin");
//             } else if (userRole.role === "user") {
//                 navigate("/userProfile");
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };
//     return (
//         <section className="section">
//             <div className="container">
//                 <div className="signup-form">
//                     <h1>Login</h1>
//                     <form>
//                         <div className="form-group">
//                             <label htmlFor="email">Email</label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 placeholder="Enter your email"
//                                 value={input.email}
//                                 onChange={handleOnChange}
//                             />

//                             {errors.email ? <span className="error">{errors.email}</span> : ""}
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="password">Password</label>
//                             <input
//                                 type="password"
//                                 name="password"
//                                 placeholder="Enter your password"
//                                 value={input.password}
//                                 onChange={handleOnChange}
//                             />

//                             {errors.password ? <span className="error">{errors.password}</span> : ""}
//                         </div>
//                         <button className="btn" onClick={HandleLoginSubmit}>
//                             Login
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </section>
//     );
// }

// export default Login;


import React, { useState } from "react";
import "./Login.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const API_URL = "https://taskmanagerreact-4.onrender.com";
  const [input, setInput] = useState({ email: "", password: "" });

  // State for errors
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Handle input change
  const handleOnChange = event => {
    const { name, value } = event.target;
    setInput(prev => ({ ...prev, [name]: value }));
  };

  // Validate inputs
  const validate = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!input.email) {
      newErrors.email = "Email is required";
      valid = false;
    }

    if (!input.password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle login submit
  const HandleLoginSubmit = async event => {
    event.preventDefault();

    if (!validate()) return;

    try {
      const response = await axios.post(`${API_URL}/api/user/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      console.log("Login Success:", response.data);
      localStorage.setItem(
        "userInfo",
        JSON.stringify({ role: response.data.role, token: response.data.token })
      );

      // Parse user role safely
      const storedUserInfo = localStorage.getItem("userInfo");
      const userRole = storedUserInfo ? JSON.parse(storedUserInfo) : null;

      if (userRole?.role === "admin") {
        navigate("/admin");
      } else if (userRole?.role === "user") {
        navigate("/userProfile");
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      setErrors(prevErrors => ({
        ...prevErrors,
        email: "",
        password: error.response?.data?.message || "Invalid email or password",
      }));
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="signup-form">
          <h1>Login</h1>
          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={input.email}
                onChange={handleOnChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={input.password}
                onChange={handleOnChange}
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>
            <button className="btn" onClick={HandleLoginSubmit}>
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
