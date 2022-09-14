//imports
import express from "express";
import mongoose from "mongoose";
import { registerValidation, loginValidation, postCreateValidation } from "./validations/validations.js";
import chekAuth from "./utils/chekAuth.js";

import * as UserController from "./controllers/UserController.js";
import * as PostController from "./controllers/PostController.js";

////mongodb
mongoose
  .connect("mongodb+srv://Sinbew:5659940@cluster0.3p3x1hf.mongodb.net/blog?retryWrites=true&w=majority")
  .then(() => {
    console.log("DB is ok");
  })
  .catch((err) => {
    console.log("DB error", err);
  });

//main
const app = express();
app.use(express.json());

app.post("/auth/login", loginValidation, UserController.login);
app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", chekAuth, UserController.getMe);

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post("/posts", chekAuth, postCreateValidation, PostController.create);
app.delete("/posts/:id", chekAuth, PostController.remove);
app.patch("/posts/:id", PostController.update);

//server status

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server is ok!");
});
