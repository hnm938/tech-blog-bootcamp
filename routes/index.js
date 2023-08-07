const express = require("express");
const router = express.Router();

// Import individual route modules
const homeRoutes = require("./homeRoutes");
const userRoutes = require("./userRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const commentRoutes = require("./commentRoutes");

// Set up routes
router.use("/", homeRoutes); // Use a distinct path for homeRoutes
router.use("/user", userRoutes); // Use a distinct path for userRoutes
router.use("/comment", commentRoutes); // Use a distinct path for userRoutes
router.use("/dashboard", dashboardRoutes);

module.exports = router;
