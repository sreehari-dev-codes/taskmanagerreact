import React, { use, useEffect, useState } from "react";
import "./EditFom.scss";
import axios from "axios";
import Swal from "sweetalert2";

function EditForm(props) {
    const { editId, setEditOpen, getAllProject } = props;
    console.log(editId);
    const [project, setProject] = useState({
        projectName: "",
        language: "",
        date: "",
    });

    const API_URL = "http://localhost:3005/api/admin/getProjectByUser";

    // function to fetch edit data
    const EditFormView = async () => {
        try {
            const response = await axios.get(`${API_URL}`, { params: { editId } });
            const data = await response.data.project;
            console.log(data.finalDate);
            const dateObject = new Date(data.finalDate);
            const formattedDate = dateObject.toISOString().split("T")[0];

            // dat convert

            setProject({
                projectName: data.projectName || "",
                language: data.language || "",
                date: formattedDate || "",
            });

            if (response.status === 201) {
                console.log("Successfully found data:", data);
            }

            console.log("project", project.date);
        } catch (error) {
            console.error("Error fetching edit form data:", error.response ? error.response.data : error.message);
        }
        console.log("project", project.date);
    };

    // const

    const editOnchange = (event) => {
        const { name, value } = event.target;
        setProject((previous) => {
            return {
                ...previous,
                [name]: value,
            };
        });
    };

    //close edit from funtion
    const closeEditForm = () => {
        setEditOpen(false);
    };

    // function to taskupdate
    const taskModify = async () => {
        const id = editId;

        try {
            const response = await axios.post(
              "http://localhost:3005/api/admin/updateUserTask",
              { id, ...project },
              {
                headers: { "Content-Type": "application/json" },
              }
            );

            if (response.status === 200) {
                setEditOpen(false);

                Swal.fire({
                    title: "Success!",
                    text: "Project updated successfully.",
                    icon: "success",
                    confirmButtonText: "Ok",
                });

                getAllProject();
            }
        } catch (error) {}
    };
    useEffect(() => {
        EditFormView();
    }, []);

    return (
        <div className="main-popup">
            <div className="popup">
                <div className="form-flex">
                    <form action="">
                        <h2>EdiFrom</h2>

                        <div className="form-input">
                            <label htmlFor="">Project</label>
                            <input
                                type="text"
                                placeholder="enter project name"
                                name="projectName"
                                value={project.projectName}
                                onChange={editOnchange}
                            />
                        </div>

                        <div className="form-input">
                            <label htmlFor="">Language</label>
                            <input
                                type="text"
                                placeholder="enter language name"
                                name="language"
                                onChange={editOnchange}
                                value={project.language}
                            />
                        </div>
                        <div className="form-input">
                            <label htmlFor="">finaldate</label>
                            <input
                                type="date"
                                placeholder="enter project name"
                                name="date"
                                value={project.date}
                                onChange={editOnchange}
                            />
                        </div>
                    </form>
                    <div className="btn">
                        <button onClick={closeEditForm}> Cancel</button>
                        <button onClick={taskModify}> Task Update</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditForm;
