import { body } from "express-validator";

export const signupValidation = [

  body("name")
    .notEmpty()
    .withMessage("Name required"),

  body("email")
    .isEmail()
    .withMessage("Invalid email"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password min 8 chars"),
];
