const { BlogPost, User } = require("../models");

const homeController = {
  async getHomepage(req, res) {
    try {
      const blogPosts = await BlogPost.findAll({
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      });

      res.render("home", { blogPosts });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = homeController;
