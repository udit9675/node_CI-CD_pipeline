const express = require("express");
const app = express();
const db = require("../models");
require("dotenv").config();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

app.get("/Users", async (req, res) => {
  try {
    const users = await db.User.findAndCountAll();
    return res.status(200).send({
      status: "Success",
      total: users.count,
      data: users.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
  res.send("Welcome to the Express-Sequelize Application!");
});

app.post("/Users", async (req, res) => {
  try {
    const user = await db.User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
