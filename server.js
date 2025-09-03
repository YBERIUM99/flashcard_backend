// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectToDb from "./config/connectToDb.js"; // make sure extension is .js
// import authRouter from "./routers/authRouter.js";

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectToDb = require("./config/connectToDb");
const authRouter = require("./routers/authRouter");

dotenv.config();
connectToDb();

const app = express();
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Server is running 🚀" });
});

app.use("/api/v1", authRouter);

// Start server
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

    