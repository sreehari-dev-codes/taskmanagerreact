const User = require("../model/user");
const Project = require("../model/project");

async function createTask(req, res) {
    try {
        const { email, projectName, language, date, managerId } = req.body;

        if (!email || !projectName || !language || !date || !managerId) {
            return res.status(400).send({ message: "All fields are required" });
        }

        // Validate manager ID
        const manager = await User.findById(managerId);
        if (!manager) {
            return res.status(400).json({ message: "Invalid manager ID" });
        }

        // Find employee
        const employee = await User.findOne({ email });
        if (!employee) {
            return res.status(400).json({ message: "Employee not found" });
        }

        const task = await Project.create({
            projectName,
            language,
            createManager: manager._id,
            projectUser: employee._id,
            finalDate: date,
        });

        return res.status(200).json({
            message: "Task created successfully.",
            task,
        });
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

async function getUserProject(req, res) {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ message: "ID not provided" });

        const userProjects = await Project.find({ projectUser: id });

        if (!userProjects.length) {
            return res.status(404).json({ message: "No projects found for this user" });
        }

        res.status(200).json({ message: "User projects retrieved", projects: userProjects });
    } catch (error) {
        console.error("Error fetching user projects:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getUsersProjects = async (req, res) => {
    try {
        const allProjects = await Project.find().populate("projectUser", "name");
        res.status(200).json(allProjects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ error: "Failed to fetch projects" });
    }
};

// const deleteTask = async (req, res) => {
//     try {
//         const { id } = req.body;
//         if (!id) return res.status(400).json({ message: "ID not provided" });

//         const findTask = await Project.findById(id);
//         if (!findTask) return res.status(404).json({ message: "Project not found" });

//         await Project.findByIdAndDelete(id);
//         return res.status(200).json({ message: "Task deleted successfully" });
//     } catch (error) {
//         console.error("Error deleting project:", error);
//         return res.status(500).json({ message: "Server error" });
//     }
// };

const deleteTask = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) return res.status(400).json({ message: "ID not provided" });

        const findTask = await Project.findById(id);
        if (!findTask) return res.status(404).json({ message: "Project not found" });

        await Project.findByIdAndDelete(id);
        return res.status(200).json({ message: "Task deleted successfully", deletedTaskId: id });
    } catch (error) {
        console.error("Error deleting project:", error);
        return res.status(500).json({ message: "Server error" });
    }
};


const getProjectByUserId = async (req, res) => {
    try {
        const { editId } = req.query;
        if (!editId) return res.status(400).json({ message: "ID not provided" });

        const project = await Project.findById(editId);
        if (!project) return res.status(404).json({ message: "Project not found" });

        res.status(200).json({ project });
    } catch (error) {
        console.error("Error fetching project:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// const updateUserTask = async (req, res) => {
//     try {
//         const { id, projectName, language, finalDate } = req.body;

//         if (!id) return res.status(400).json({ message: "ID not provided" });

//         if (!projectName && !language && !finalDate) {
//             return res.status(400).json({ message: "No fields provided for update" });
//         }

//         const updatedProject = await Project.findByIdAndUpdate(
//             id,
//             { projectName, language, finalDate },
//             { new: true }
//         );

//         if (!updatedProject) return res.status(404).json({ message: "Project not found" });

//         res.status(200).json({ message: "Project updated successfully", updatedProject });
//     } catch (error) {
//         console.error("Error updating project:", error);
//         return res.status(500).json({ message: "Server error" });
//     }
// };


// const updateUserTask = async (req, res) => {
//     try {
//         const { id, projectName, language, finalDate } = req.body;

//         if (!id) return res.status(400).json({ message: "ID not provided" });

//         if (!projectName && !language && !finalDate) {
//             return res.status(400).json({ message: "No fields provided for update" });
//         }

//         const updatedProject = await Project.findByIdAndUpdate(
//             id,
//             { projectName, language, finalDate },
//             { new: true }
//         );

//         if (!updatedProject) return res.status(404).json({ message: "Project not found" });

//         // Return the updated project
//         res.status(200).json({ message: "Project updated successfully", updatedProject });
//     } catch (error) {
//         console.error("Error updating project:", error);
//         return res.status(500).json({ message: "Server error" });
//     }
// };


const updateUserTask = async (req, res) => {
    try {
        const { id, projectName, language, finalDate } = req.body;

        // Ensure the task ID is provided
        if (!id) return res.status(400).json({ message: "ID not provided" });

        // Ensure at least one field is provided for update
        if (!projectName && !language && !finalDate) {
            return res.status(400).json({ message: "No fields provided for update" });
        }

        // Use findByIdAndUpdate to update the task
        const updatedProject = await Project.findByIdAndUpdate(
            id, // Search by the provided ID
            { projectName, language, finalDate }, // Fields to update
            { new: true } // Return the updated document
        );

        // Handle case if the project with the provided ID is not found
        if (!updatedProject) {
            return res.status(404).json({ message: "Project not found" });
        }

        // Return the updated project data
        res.status(200).json({
            message: "Project updated successfully",
            updatedProject,
        });
    } catch (error) {
        // Log error and send server error response
        console.error("Error updating project:", error);
        return res.status(500).json({ message: "Server error" });
    }
};


const getUserProjectDetails = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) return res.status(400).json({ message: "ID not provided" });

        const project = await Project.findById(id);
        if (!project) return res.status(404).json({ message: "Project not found" });

        res.status(200).json({ message: "Project retrieved successfully", project });
    } catch (error) {
        console.error("Error fetching project:", error);
        return res.status(500).json({ message: "Server error" });
    }
};

// const userModifyTask = async (req, res) => {
//     try {
//         const { editData: { id, status } } = req.body;

//         if (!id || !status) {
//             return res.status(400).json({ message: "ID and status are required" });
//         }

//         const validStatuses = ["inProgress", "completed", "pending"];
//         if (!validStatuses.includes(status)) {
//             return res.status(400).json({ message: "Invalid status value" });
//         }

//         const updatedTask = await Project.findByIdAndUpdate(id, { status }, { new: true });

//         if (!updatedTask) {
//             return res.status(404).json({ message: "Project not found" });
//         }

//         res.status(200).json({ message: "Task updated successfully", updatedTask });
//     } catch (error) {
//         console.error("Error updating project:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };


const userModifyTask = async (req, res) => {
    try {
        const { editData: { id, status } } = req.body;

        if (!id || !status) {
            return res.status(400).json({ message: "ID and status are required" });
        }

        // Map frontend status to backend-friendly format
        const statusMapping = {
            "On Progress": "inProgress",
            "Completed": "completed",
            "Pending": "pending"
        };

        const backendStatus = statusMapping[status] || status;

        const validStatuses = ["inProgress", "completed", "pending"];
        if (!validStatuses.includes(backendStatus)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const updatedTask = await Project.findByIdAndUpdate(id, { status: backendStatus }, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({ message: "Task updated successfully", updatedTask });
    } catch (error) {
        console.error("Error updating project:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    createTask,
    getUserProject,
    getUsersProjects,
    deleteTask,
    getProjectByUserId,
    updateUserTask,
    userModifyTask,
    getUserProjectDetails,
};
