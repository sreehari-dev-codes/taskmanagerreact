import React, { useEffect, useState } from "react";
import "./Admin.scss";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useSelector } from "react-redux";
import TaskForm from "../TaskForm/TaskForm";
import { useNavigate } from "react-router-dom";
import ProjectTable from "../ProjectTable/ProjectTable";
import Cookies from "js-cookie";

function Admin() {
  const user = useSelector(state => state.user);
  const [users, setUser] = useState([]);
  const [project, setProject] = useState([]);
  const [load, setLoad] = useState(false);
  const [openFrom, setOpenForm] = useState(false);
  const navigate = useNavigate();

  const handleForm = () => {
    setOpenForm(true);
  };

  const getAllProject = async () => {
    try {
      setLoad(true);
      const token = Cookies.get("token");
    const response = await axios.get(
      "http://localhost:3005/api/admin/getUsersproject",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

      const data = response.data;
      setProject(data);
      setLoad(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setLoad(false);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  useEffect(() => {
    getAllProject();
  }, []);

  return (
    <div className="admin-container">
      {openFrom && (
        <TaskForm setOpenForm={setOpenForm} getAllProject={getAllProject} />
      )}

      <div className="admin-page">
        <div className="slide-bar">
          <div className="brand-name">
            <h3>
              taskflow <i class="fa-solid fa-list-check"></i>
            </h3>
          </div>

          <div className="nav">
            <span style={{ color: "white" }} onClick={handleForm}>
              Create New Task
            </span>
            <span style={{ color: "white" }} onClick={logout}>
              Log Out
            </span>
          </div>
        </div>

        <div className="main-page">
          <div className="header">
            <h2>Dashboard</h2>
            {user && user.name ? (
              <p>Welcome, {user.name}</p>
            ) : (
              <p>Loading...</p>
            )}
            <button
              className="logOut"
              onClick={logout}
              style={{
                color: "white",
                background: "#e197dc",
                cursor: "pointer",
              }}
            >
              Log Out
            </button>
          </div>

          <div className="user-details">
            {load ? (
              <Loading />
            ) : (
              <ProjectTable project={project} getAllProject={getAllProject} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
