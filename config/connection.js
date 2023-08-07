const { Sequelize } = require("sequelize");
require("dotenv").config(); // Load environment variables from .env

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql", // Database dialect (e.g., mysql, postgres, sqlite, etc.)
    port: 3306, // Port number (if not default)
  }
);

module.exports = sequelize;
