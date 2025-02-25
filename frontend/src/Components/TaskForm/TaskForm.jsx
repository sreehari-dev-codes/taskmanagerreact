
import React, { useState } from "react";
import "./TaskFrom.scss";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";

function TaskForm(props) {
  const API_URL = "http://localhost:3005";
  const managerId = useSelector(state => state.user?.id); // Ensure managerId exists

  const { setOpenForm, getAllProject } = props;

  const taskFormClose = () => {
    setOpenForm(false);
  };

  // Initialize task form state
  const [value, setValue] = useState({
    email: "",
    projectName: "",
    language: "",
    date: "",
  });

  // Initialize error message state
  const [errors, setErrors] = useState({
    email: "",
    projectName: "",
    language: "",
    date: "",
  });

  // Handle form changes
  const createTaskOnChange = event => {
    const { name, value } = event.target;
    setValue(previous => ({
      ...previous,
      [name]: value,
    }));
  };

  // Validate task form
  const validate = () => {
    let valid = true;
    const newErrors = { email: "", projectName: "", language: "", date: "" };

    if (!value.email) {
      newErrors.email = "Email is required";
      valid = false;
    }

    if (!value.projectName) {
      newErrors.projectName = "Project name is required";
      valid = false;
    }

    if (!value.language) {
      newErrors.language = "Language is required";
      valid = false;
    }

    if (!value.date) {
      newErrors.date = "Date is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle task creation
  const createTaskHandler = async event => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    if (!managerId) {
      Swal.fire({
        title: "Error!",
        text: "Manager ID is missing. Please log in again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const taskData = {
      ...value,
      managerId,
    };

    try {
      const response = await axios.post(
        `${API_URL}/api/admin/createTask`,
        taskData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        setOpenForm(false);
        getAllProject();

        Swal.fire({
          title: "Success!",
          text: "Task created successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Swal.fire({
          title: "Error!",
          text: error.response.data.message || "This email is not logged.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <div className="main-popup">
      <div className="popup">
        <div className="form-flex">
          <form onSubmit={createTaskHandler}>
            <div className="form-input">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter email of employee"
                name="email"
                onChange={createTaskOnChange}
                value={value.email}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="form-input">
              <label>Project</label>
              <input
                type="text"
                placeholder="Enter project name"
                name="projectName"
                onChange={createTaskOnChange}
                value={value.projectName}
              />
              {errors.projectName && (
                <span className="error">{errors.projectName}</span>
              )}
            </div>

            <div className="form-input">
              <label>Language</label>
              <input
                type="text"
                placeholder="Enter language name"
                name="language"
                onChange={createTaskOnChange}
                value={value.language}
              />
              {errors.language && (
                <span className="error">{errors.language}</span>
              )}
            </div>

            <div className="form-input">
              <label>Final Date</label>
              <input
                type="date"
                placeholder="Enter project final date"
                name="date"
                onChange={createTaskOnChange}
                value={value.date}
              />
              {errors.date && <span className="error">{errors.date}</span>}
            </div>

            <div className="btn">
              <button type="button" onClick={taskFormClose}>
                Cancel
              </button>
              <button type="submit">ADD Task</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TaskForm;
