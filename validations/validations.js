import { body } from "express-validator";

export const loginValidation = [body("email", "Wrong email format").isEmail(), body("password", "Password  must be at least 5 characters length").isLength({ min: 5 })];

export const registerValidation = [
  body("email", "Wrong email format").isEmail(),
  body("password", "Password  must be at least 5 characters length").isLength({ min: 5 }),
  body("fullName", "Enter your name").isLength({ min: 2 }),
  body("avatarUrl", "Wrong link to a avatar").optional().isURL(),
];

export const postCreateValidation = [
  body("title", "Please, enter a post title").isLength({ min: 3 }).isString(),
  body("text", "Please, enter a post text").isLength({ min: 10 }).isString(),
  body("tags", "Wrong format of tags").optional().isString(),
  body("imageUrl", "Wrong link to the image").optional().isString(),
];
