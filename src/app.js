const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Route imports
const user = require("./routes/userRoutes");

app.use("/api",user)

module.exports = app;