const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const helpers = require("./config/helpers");
const sequelize = require("./config/connection"); // Adjust the path to your Sequelize configuration
const path = require("path");
const exphbs = require("express-handlebars");
const routes = require("./routes/index"); // Use index.js for routes
const app = express();

const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({
  handlebars: helpers,
  allowProtoMethodsByDefault: true,
  allowProtoPropertiesByDefault: true,
});

// Set up session middleware
const sessionStore = new SequelizeStore({
  db: sequelize,
});

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2, // 2 hours
    },
  })
);

app.use((req, res, next) => {
  res.locals.loggedIn = req.session.loggedIn; // Assuming you have stored loggedIn in the session
  next();
});

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Set up view engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Use routes
app.use("/", routes); // Use the index.js file for routes

// Start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
