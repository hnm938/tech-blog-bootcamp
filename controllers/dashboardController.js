const { User, BlogPost, Comment } = require("../models");

const dashboardController = {
  async getDashboard(req, res) {
    try {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ["password"] },
        include: [{ model: BlogPost }],
      });

      const user = userData.get({ plain: true });

      res.render("dashboard", { user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async createBlogPost(req, res) {
    try {
      await BlogPost.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id,
      });

      res.redirect("/dashboard");
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  // ... Add other methods for updating and deleting posts
};

module.exports = dashboardController;
