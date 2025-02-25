import React, { useState } from "react";
import "./SignUp.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/userD/User";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const API_URL = "http://localhost:3005";

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [error, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  // Handle input change
  const handleInput = event => {
    setInput({ ...input, [event.target.name]: event.target.value });
  };

  // Validate form
  const validate = () => {
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    };

    if (!input.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!input.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(input.email)) {
      newErrors.email = "Enter a valid email address";
      valid = false;
    }

    if (!input.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (input.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (input.password !== input.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  const handleSignUpSubmit = async event => {
    event.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post(`${API_URL}/api/user`, input, {
        headers: { "Content-Type": "application/json" },
      });

      localStorage.setItem("userInfo", JSON.stringify(response.data));

      // Save user to Redux store
      dispatch(
        setUser({
          _id: response.data._id,
          name: response.data.name,
          email: response.data.email,
        })
      );

      navigate("/login");
    } catch (error) {
      console.error(
        "Error during registration:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="signup-form">
          <h1>Sign Up</h1>
          <form onSubmit={handleSignUpSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={input.name}
                placeholder="Enter your name"
                onChange={handleInput}
              />
              {error.name && <span className="error">{error.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={input.email}
                placeholder="Enter your email"
                onChange={handleInput}
              />
              {error.email && <span className="error">{error.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={input.password}
                placeholder="Enter your password"
                onChange={handleInput}
              />
              {error.password && (
                <span className="error">{error.password}</span>
              )}
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirm_password"
                value={input.confirm_password}
                placeholder="Re-enter your password"
                onChange={handleInput}
              />
              {error.confirm_password && (
                <span className="error">{error.confirm_password}</span>
              )}
            </div>

            <div className="button-container">
              <button type="submit" className="btn">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignUp;
