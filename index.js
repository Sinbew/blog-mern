//imports
import express from "express";
import multer from "multer";
import mongoose from "mongoose";

import { registerValidation, loginValidation, postCreateValidation } from "./validations/validations.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";
import { UserController, PostController } from "./controllers/index.js";

// MongoDB //
mongoose
  .connect("mongodb+srv://Sinbew:5659940@cluster0.3p3x1hf.mongodb.net/blog?retryWrites=true&w=majority")
  .then(() => {
    console.log("DB is ok");
  })
  .catch((err) => {
    console.log("DB error", err);
  });

// Main operations //

const storage = multer.diskStorage({
  destination: (_, __, callback) => {
    callback(null, "uploads");
  },
  filename: (_, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads")); //Обьясняем express, что мы делаем get запрос на получение статичного файла

app.post("/auth/login", loginValidation, handleValidationErrors, UserController.login);
app.post("/auth/register", registerValidation, handleValidationErrors, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", checkAuth, postCreateValidation, handleValidationErrors, PostController.create);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch("/posts/:id", checkAuth, postCreateValidation, handleValidationErrors, PostController.update);

// Server status //

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server is ok!");
});
