import * as todoService from "../services/todoService.js";
import supabase from "../config/supabase.js";


// Create Todo
export const addTodo = async (req, res) => {

  try {

    const { title, description, userId } = req.body;

    if (!title || !userId) {
      return res.status(400).json({ message: "Title & userId required" });
    }

    // Check user exists
    const { data: user } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { error } = await todoService.createTodo({
      title,
      description,
      user_id: userId
    });

    if (error) throw error;

    res.status(201).json({ message: "Todo added" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get User Todos
export const getUserTodos = async (req, res) => {

  try {

    const { userId } = req.params;

    const { data, error } =
      await todoService.getTodosByUser(userId);

    if (error) throw error;

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Update Todo
export const updateTodo = async (req, res) => {

  try {

    const { todoId } = req.params;

    const { data: todo } =
      await todoService.getTodoById(todoId);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const { error } =
      await todoService.updateTodo(todoId, req.body);

    if (error) throw error;

    res.json({ message: "Todo updated" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Delete Todo
export const deleteTodo = async (req, res) => {

  try {

    const { todoId } = req.params;

    const { error } =
      await todoService.deleteTodo(todoId);

    if (error) throw error;

    res.json({ message: "Todo deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
