import React, { useState } from "react";
import "./SignUp.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/userD/User";

function SignUp() {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const dispatch = useDispatch(); // Initialize redux di
   
    const API_URL = "https://taskmanagerreact-4.onrender.com";

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

    //inputOnchange
    const handleInput = (event) => {
        const inputValue = event.target.value;
        const inputName = event.target.name;

        setInput((prevsValue) => {
            return {
                ...prevsValue,
                [inputName]: inputValue,
            };
        });
    };


    const validiate = () => {
        let valid = true;
        const newErrors = { name: "", email: "", password: "", confirm_password: "" };

        //name

        if (!input.name) {
            newErrors.name = "Name  is required";
            valid = false;
        }

        if (!input.email) {
            newErrors.email = "email is required";
            valid = false;
        }

        if (!input.password) {
            newErrors.password = "password is required";
            valid = false;
        } else if (input.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
            valid = false;
        }

        if (input.password !== input.confirm_password) {
            newErrors.confirm_password = " confom_password is required";
            valid = false;
        }
        setErrors(newErrors);

        return valid;
    };
    const handleSignUpSubmit = async (event) => {
        event.preventDefault();

        if (!validiate()) {
            return;
        }

        if (input.password !== input.confirm_password) {
            console.log("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/api/user`, input, {
                headers: { "Content-Type": "application/json" },
            });

            console.log(response.data, "registerUser");
            const userInfo = localStorage.setItem("userinfo", JSON.stringify(response.data));

            if (userInfo) {
                const { _id, name, email } = userInfo;

                dispatch(setUser({ _id, name, email }));
            }

            navigate("/login");
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    return (
        <section className="section">
            <div className="container">
                <div className="signup-form">
                    <h1>Sign Up</h1>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={input.name}
                                placeholder="Enter your name"
                                onChange={handleInput}
                            />

                            {error.name ? <span className="error">{error.name}</span> : ""}
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

                            {error.email ? <span className="error">{error.email}</span> : ""}
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
                            {error.password ? <span className="error">{error.password}</span> : ""}
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
                            {error.confirm_password ? <span className="error">{error.confirm_password}</span> : ""}
                        </div>

                        <button type="submit" className="btn" onClick={handleSignUpSubmit}>
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default SignUp;
