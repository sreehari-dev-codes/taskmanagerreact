import React, { useState } from "react";
import "./ProjectTable.scss";
import ProjectDelete from "../projectPopUp/ProjectDelete";
import EditForm from "../EditForm/EditForm";

function ProjectTable(props) {
    const { project, getAllProject } = props;
    const [open, setOpen] = useState(false);
    const [openEdit, setEditOpen] = useState(false);
    const [id, setId] = useState("string");
    const [editId, setEditId] = useState("string");
    const API_URL = "http://localhost:3005/api/admin/deleteTask";

    const opendeleteModal = (id) => {
        setId(id);
        setOpen(true);
    };
    //initlizeediform open function
    const handleEditFrom = (id) => {
        setEditOpen(true);
        setEditId(id);
    };

    return (
        <div>
            {open === true ? <ProjectDelete setOpen={setOpen} id={id} getAllProject={getAllProject} /> : ""}
            {openEdit === true ? <EditForm editId={editId} setEditOpen={setEditOpen} getAllProject={getAllProject} /> : ""}
            <table className="project-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Employee Name</th>
                        <th>Project Name</th>
                        <th>Language</th>
                        <th>Status</th>
                        <th>Last Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {project.map((project, index) => (
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{project.projectUser.name}</td>
                            <td>{project.projectName}</td>
                            <td>{project.language}</td>
                            <td>{project.status}</td>
                            <td>{new Date(project.finalDate).toLocaleDateString()}</td>
                            <td className="edit-delete">
                                <button onClick={() => handleEditFrom(project._id)} style={{ cursor: "pointer" }}>
                                    Edit
                                </button>
                                <button onClick={() => opendeleteModal(project._id)} style={{ cursor: "pointer" }}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProjectTable;
