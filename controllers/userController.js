import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import * as userService from "../services/userService.js";

// Signup
export const signup = async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {

    const { name, email, password } = req.body;

    const { data: existing } =
      await userService.findByEmail(email);

    if (existing) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const { error } = await userService.createUser({
      name,
      email,
      password: hashed,
    });

    if (error) throw error;

    res.status(201).json({ message: "User registered" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Delete User (Cascade)
export const deleteUser = async (req, res) => {

  try {

    const { id } = req.params;

    const { error } = await userService.deleteUser(id);

    if (error) throw error;

    res.json({ message: "User & Todos deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
