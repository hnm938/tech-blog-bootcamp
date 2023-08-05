const express = require("express");
const router = express.Router();
const withAuth = require("../middleware/withAuth"); // Middleware to check if user is authenticated
const dashboardController = require("../controllers/dashboardController");

router.get("/", withAuth, dashboardController.getDashboard);
router.post("/new-post", withAuth, dashboardController.createBlogPost);
// Add more routes for updating and deleting posts

module.exports = router;
