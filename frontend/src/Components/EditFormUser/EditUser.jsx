import React, { useEffect, useState } from "react";
import "./editUser.scss";
import axios from "axios";
import Swal from "sweetalert2";

function EditUser(props) {
    const API_URL = "http://localhost:3005/api/admin";
    const { setOpenEdit, editId, getUserProject } = props;
    console.log(editId);
    const [details, setDetails] = useState({
        projectName: "",
        language: "",
        status: "",
    });
    const id = editId;

    // function to close editForm

    const closeEditFom = () => {
        setOpenEdit(false);
    };

    const viewUserProject = async () => {
        try {
            const response = await axios.get(`${API_URL}/getUserProject`, { params: { id } });
            const data = await response.data.userProject;
            setDetails({
                projectName: data.projectName || "",
                language: data.language || "",
                status: data.status || "",
            });

            if (response.status === 200) {
            }
        } catch (error) {
            console.error("Error fetching user project:", error.message);
        }
    };

    // to function value geting status

    const modifyTaskOnChange = (event) => {
        const { name, value } = event.target;
        setDetails((prevos) => {
            return {
                ...prevos,
                [name]: value,
            };
        });
    };

    // to function update status
    const modifyTask = async () => {
        const id = editId;
        let status = details.status;

        const editData = {
            id: id,
            status: status,
        };

        try {
            const response = await axios.post(
                `${API_URL}/editUserTask`,
                { editData },
                {
                    headers: { "Content-Type": "application/json" },
                }
            );

            const data = response.data; // Extract the response data
            console.log(data); // Use the data as needed

            if (response.status === 200) {
                setOpenEdit(false);

                getUserProject();

                Swal.fire({
                    title: "Success!",
                    text: "Project status updated successfully.",
                    icon: "success",
                    confirmButtonText: "Okay",
                });
            }
        } catch (error) {
            console.error("Error making API request:", error.message);
        }
    };

    useEffect(() => {
        viewUserProject();
    }, []);
    return (
        <div className="main-popup">
            <div className="popup">
                <div className="form-flex">
                    <form action="">
                        <div className="form-input">
                            <label htmlFor="">project</label>
                            <input
                                type="project"
                                placeholder="enter  project"
                                name="projectName"
                                disabled
                                value={details.projectName}
                            />
                        </div>

                        <div className="form-input">
                            <label htmlFor="">language</label>
                            <input
                                type="text"
                                placeholder="enter language name"
                                name="language"
                                disabled
                                value={details.language}
                            />
                        </div>

                        <div className="form-input">






                            
                            <label htmlFor="status">Status</label>
                            <select name="status" id="status" value={details.status} onChange={modifyTaskOnChange}>
                                <option value="inProgress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>
                    </form>
                    <div className="btn">
                        <button onClick={closeEditFom}> Cancel</button>
                        <button onClick={modifyTask}>Update Task</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditUser;
