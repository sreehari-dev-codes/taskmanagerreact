const express = require("express");
const router = express.Router();
const { 
    createTask, 
    getUserProject, 
    getUsersProjects, 
    deleteTask, 
    getProjectByUserId, 
    updateUserTask, 
    userModifyTask, 
    getUserProjectDetails 
} = require("../controller/project"); // ✅ Correct import

router.post("/createTask", createTask);
router.get("/user/project/:id", getUserProject);
router.get("/getUsersproject", getUsersProjects);
router.post("/deleteTask", deleteTask);
router.get("/getProjectByUser", getProjectByUserId);
router.post("/updateUserTask", updateUserTask);
router.post("/editUserTask", userModifyTask);
router.get("/getUserProject", getUserProjectDetails);

module.exports = router;
