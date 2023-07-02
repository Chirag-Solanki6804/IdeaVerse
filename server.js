const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./models/user.model");

const app = express();

/**
 * Logic to connect to MongoDB and create an ADMIN user
 * Need to have the mongodb up and running in your local machine
 */

mongodb: mongoose.connect("mongodb://localhost/ideaVerse");

const db = mongoose.connection;

db.on("error", () => {
  console.log("Connection fail to database");
});

db.once("open", () => {
  console.log("connected to database");
  init();
});

async function init() {
  /**
   * Check if the admin user is already present
   */

  let admin = await userModel.findOne({
    userType: "ADMIN",
  });

  if (admin) {
    console.log("Admin user already present");
    return;
  }

  admin = await userModel.create({
    name: "chirag solanki",
    userId: "admin",
    email: "sc494802@gmail",
    userType: "ADMIN",
    password: "crs@3098",
  });

  console.log(admin);
}

app.listen(8000, () => {
  console.log("server stared at port 8000");
});
