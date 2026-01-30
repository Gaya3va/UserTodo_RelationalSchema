import express from "express";
import * as todoController from "../controllers/todoController.js";

const router = express.Router();

router.post("/add-todo", todoController.addTodo);

router.get(
  "/get-my-todo/:userId",
  todoController.getUserTodos
);

router.put(
  "/update-todo/:todoId",
  todoController.updateTodo
);

router.delete(
  "/delete-todo/:todoId",
  todoController.deleteTodo
);

export default router;
