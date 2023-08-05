const express = require("express");
const router = express.Router();

// Import individual route modules
const homeRoutes = require("./homeRoutes");
const userRoutes = require("./userRoutes");
const dashboardRoutes = require("./dashboardRoutes");

// Set up routes
router.use("/", homeRoutes);
router.use("/", userRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;
