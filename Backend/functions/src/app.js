require("dotenv").config();
const express = require("express");
const cors = require("cors");
const todolistRoutes = require("./routes/todolist");
const usersRoutes = require("./routes/users");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/todolist", todolistRoutes);
app.use("/users", usersRoutes);

console.log(
  `API ejecutándose en ${process.env.API_BASE_URL || "localhost:5000"}`
);

module.exports = app;
