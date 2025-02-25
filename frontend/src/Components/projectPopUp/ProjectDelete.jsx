
import React from "react";
import "./ProjectDelete.scss";
import axios from "axios";
import Swal from "sweetalert2";

function ProjectDelete({ setOpen, id, getAllProject }) {
  const API_URL = "http://localhost:3005/api/admin/deleteTask"; // ✅ Ensure this is correct

  const DeleteProject = async () => {
    console.log("Deleting Task ID:", id);
    try {
      const response = await axios.post(
        API_URL,
        { id },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
       
        setOpen(false);


        setTimeout(() => {
          getAllProject(); 
        }, 500);

        Swal.fire({
          icon: "success",
          title: "Deleted Successfully",
          text: "The project has been removed from the list.",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: "Something went wrong. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Are you sure?</h2>
        <p>
          Do you really want to delete this item? This process cannot be undone.
        </p>
        <div className="popup-buttons">
          <button className="btn confirm-btn" onClick={DeleteProject}>
            Yes, Delete
          </button>
          <button className="btn cancel-btn" onClick={() => setOpen(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectDelete;
