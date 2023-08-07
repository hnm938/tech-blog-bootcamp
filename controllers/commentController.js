const { Comment } = require("../models");

const commentController = {
  async createComment(req, res) {
    try {
      const { text } = req.body;
      const user_id = req.session.user_id;
      const blogpost_id = req.params.postId;

      const comment = await Comment.create({
        text,
        user_id,
        blogpost_id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      res.status(201).json(comment);
    } catch (error) {
      console.error("Error creating comment:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

module.exports = commentController;
