import React, { useState } from "react";
import "./User.scss";
import { useSelector } from "react-redux";
import EditUser from "../EditFormUser/EditUser";
import ClipLoader from "react-spinners/ClipLoader";
import useUserProjects from "../../hooks/useUserProjects"; // Import the custom hook

function User() {
    const data = useSelector((state) => state.user);
    const [openEdit, setOpenEdit] = useState(false);
    const [editId, setEditId] = useState("");

    const { projects, isLoading, getUserProject } = useUserProjects(data.id); // Using the custom hook

    const openEditForm = (id) => {
        setOpenEdit(true);
        setEditId(id);
    };

    return (
        <div className="section">
            {openEdit && <EditUser setOpenEdit={setOpenEdit} editId={editId} getUserProject={getUserProject} />}
            <div className="container">
                {isLoading ? (
                    <div className="spinner">
                        <ClipLoader color="#4CAF50" loading={isLoading} size={50} />
                    </div>
                ) : (
                    <div className="userProfie">
                        <table className="user-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Project Name</th>
                                    <th>Language</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((value, index) => (
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td>{value.projectName}</td>
                                        <td>{value.language}</td>
                                        <td>{value.status}</td>
                                        <td>
                                            <button className="link" onClick={() => openEditForm(value._id)}>
                                                Edit <i className="fa-solid fa-pen-to-square"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default User;
