import express from "express";
import * as userController from "../controllers/userController.js";
import { signupValidation } from "../validations/userValidation.js";

const router = express.Router();

router.post("/signup", signupValidation, userController.signup);

router.delete("/:id", userController.deleteUser);

export default router;
