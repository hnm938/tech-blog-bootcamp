const { User } = require("../models");

const userController = {
  async signUp(req, res) {
    try {
      const newUser = await User.create({
        username: req.body.username,
        password: req.body.password,
      });

      req.session.save(() => {
        req.session.user_id = newUser.id;
        req.session.username = newUser.username;
        req.session.loggedIn = true;
        res.redirect("/dashboard");
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async logIn(req, res) {
    try {
      const user = await User.findOne({
        where: { username: req.body.username },
      });

      if (!user || !user.checkPassword(req.body.password)) {
        res.status(400).json({ message: "Incorrect username or password" });
        return;
      }

      req.session.save(() => {
        req.session.user_id = user.id;
        req.session.username = user.username;
        req.session.loggedIn = true;
        res.redirect("/dashboard");
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  async logOut(req, res) {
    try {
      req.session.destroy(() => {
        res.redirect("/");
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = userController;
