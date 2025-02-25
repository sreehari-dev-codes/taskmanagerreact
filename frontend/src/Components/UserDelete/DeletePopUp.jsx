import React from "react";
import "./deletePopUp.scss";
import axios from "axios";
import swal from "sweetalert";

function DeletePopUp(props) {
    const API_URL = "http://localhost:3005/api/user";
    const { SetPopup, id, getAllUsers } = props;
    

    const cancelDelete = () => {
        SetPopup(false);
    };

    const userDelete = async () => {
        const userId = id;
        try {
            const responce = await axios.post(`${API_URL}/deleteUser`, { _id: userId });
            console.log(responce.data);
        } catch (error) {
            console.error("Error deleting user:", error.message);
        }
        swal({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success",
            button: "OK",
        });

        SetPopup(false);
        getAllUsers();
    };

    return (
        <div className="popup-overlay">
            <div className="popup">
                <h2>Are you sure?</h2>
                <p> "Do you really want to delete this item? This process cannot be undone</p>
                <div className="popup-buttons">
                    <button className="btn confirm-btn" onClick={userDelete}>
                        Yes, Delete
                    </button>
                    <button className="btn cancel-btn" onClick={cancelDelete}>
                        cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeletePopUp;
