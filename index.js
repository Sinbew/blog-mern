//imports
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { registerValidation } from "./validations/auth.js";
import { validationResult } from "express-validator";

//main

mongoose
  .connect("mongodb+srv://Sinbew:5659940@cluster0.3p3x1hf.mongodb.net/?retryWrites=true&w=majority")
  .then(() => {
    console.log("DB is ok");
  })
  .catch((err) => {
    console.log("DB error", err);
  });

const app = express();
app.use(express.json());

app.post("/auth/register", registerValidation, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  res.json({
    success: true,
  });
});

//server status

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server is ok!");
});
