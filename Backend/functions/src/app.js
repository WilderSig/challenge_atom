require("dotenv").config();const express = require("express");
const cors = require("cors");
const todolistRoutes = require("./routes/todolist");
const usersRoutes = require("./routes/users");

const app = express();

app.use(cors({ origin: "http://localhost:4200/" }));
// Middleware para configurar COOP
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});
app.use(express.json());
app.use("/todolist", todolistRoutes);
app.use("/users", usersRoutes);

console.log(
  `API ejecutándose en ${process.env.API_BASE_URL || "localhost:5000"}`
);

module.exports = app;
