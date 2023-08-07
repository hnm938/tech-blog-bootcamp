const { User, BlogPost, Comment } = require("../models");

const dashboardController = {
  renderNewPostForm(req, res) {
    res.render("new-post");
  },

  async renderSinglePost(req, res) {
    try {
      const postId = req.params.postId;

      // Fetch the blog post from the database by postId
      const posts = await BlogPost.findByPk(postId, {
        include: [{ model: User, attributes: ["username"] }], // Include user info
      });

      if (!posts) {
        return res.status(404).render("error", { message: "Post not found" });
      }

      // Render the single post view with the fetched post data
      res.render("post", { post: posts.get({ plain: true }) });
    } catch (error) {
      console.error("Error fetching single post:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async deletePost(req, res) {
    try {
      const postId = req.params.postId;

      // Find the post by postId
      const post = await BlogPost.findByPk(postId);

      if (!post) {
        return res.status(404).render("error", { message: "Post not found" });
      }

      // Delete the post
      await post.destroy();

      // Redirect back to the dashboard or homepage
      res.redirect("/dashboard");
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async updatePost(req, res) {
    try {
      const postId = req.params.postId;
      const { title, content } = req.body;

      // Find the post by postId
      const post = await BlogPost.findByPk(postId);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Update the post
      await post.update({
        title,
        content,
      });

      console.log("asd");
      // Redirect back to the post or dashboard
      res.redirect(`/post/${postId}`); // You can change this to the appropriate route
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

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
  }
};

module.exports = dashboardController;
