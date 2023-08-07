const express = require("express");
const router = express.Router();
const withAuth = require("../middleware/withAuth"); // Middleware to check if user is authenticated
const dashboardController = require("../controllers/dashboardController");
router.get("/", withAuth, dashboardController.getDashboard);

router.post("/new-post", withAuth, dashboardController.createBlogPost);
router.get("/new-post", dashboardController.renderNewPostForm);

router.get("/post/:postId", dashboardController.renderSinglePost);
router.put("/post/:postId", dashboardController.updatePost);
router.delete("/post/:postId", dashboardController.deletePost);

module.exports = router;
