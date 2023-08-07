const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

// Route to create a new comment
router.post("/:postId", commentController.createComment);

module.exports = router;
