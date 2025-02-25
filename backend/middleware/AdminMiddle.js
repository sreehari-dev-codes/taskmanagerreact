// const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {
//     const token = req.cookies.token || req.headers["authorization"]?.split(" ")[1];

//     if (!token) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded; // Attach user info to the request
//         next();
//     } catch (err) {
//         return res.status(403).json({ message: "Invalid token" });
//     }
// };

// module.exports = {
//     verifyToken,
// };


// const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {
//     const token = req.cookies.token; // Read token from cookies

//     if (!token) {
//         return res.status(401).json({ message: "Unauthorized: No token provided" });
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ message: "Forbidden: Invalid token" });
//         }

//         req.user = decoded; // Attach user data to request
//         next(); // Continue to next middleware
//     });
// };

// module.exports = { verifyToken };


// const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {
//     // Read token from either cookies or headers
//     const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

//     if (!token) {
//         return res.status(401).json({ message: "Unauthorized: No token provided" });
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//         if (err) {
//             return res.status(403).json({ message: "Forbidden: Invalid token" });
//         }

//         req.user = decoded; // Attach user data to request
//         next(); // Continue to next middleware
//     });
// };

// module.exports = { verifyToken };


const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization; // Read token from Authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden: Invalid token" });
        }

        req.user = decoded; // Attach user data to request
        next(); // Continue to next middleware
    });
};

module.exports = { verifyToken };
