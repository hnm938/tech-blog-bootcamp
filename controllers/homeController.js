const { BlogPost, User, Comment } = require("../models");

const homeController = {
  async getHomepage(req, res) {
    try {
      const posts = await BlogPost.findAll({
        include: [
          { model: User, attributes: ["username"] },
          {
            model: Comment,
            include: [{ model: User, attributes: ["username", "id"] }],
          },
        ],
      });

      res.render("home", {
        blogPosts: posts.map((post) => ({
          ...post.get({ plain: true }),
          comments: post.comments.map((comment) => ({
            ...comment.get({ plain: true }),
            loggedInUserID: req.session.user_id,
          })),
        })),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = homeController;
