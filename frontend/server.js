
require("dotenv").config();
const express = require("express");
const { mongoDBConnecting } = require("./config/db");
const routerUser = require("./routes/user");
const routerProject = require("./routes/project");
const cors = require("cors");

// Check if essential environment variables are set
if (!process.env.MONGO_URL) {
    console.error(" MONGO_URL is missing in environment variables.");
    process.exit(1);
}

const app = express();
const port = process.env.PORT || 3005;

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Setup
    const allowedOrigins = ["http://localhost:3000", "http://localhost:3001","https://taskmanagerreact.vercel.app"];
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                console.warn(` CORS blocked request from: ${origin}`);
                callback(null, false); // Deny the request without throwing an error
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true, // Allow credentials (cookies, auth headers, etc.)
    })
);

// Function to start the server
async function startServer() {
    try {
        await mongoDBConnecting(process.env.MONGO_URL);
        console.log(" MongoDB Connected Successfully!");

        // API Routes (Load only after DB connection)
        app.use("/api/user", routerUser);
        app.use("/api/admin", routerProject);

        // Default Route
        app.get("/", (req, res) => {
            res.json({ message: "🚀 Welcome to the Task Manager Server!" });
        });

        // Start the Server
        app.listen(port, () => {
            console.log(`🚀 Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1); // Exit if DB connection fails
    }
}

// Run the server
startServer();

// Global Error Handler (Optional)
app.use((err, req, res, next) => {
    console.error("💥 Global Error:", err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});
