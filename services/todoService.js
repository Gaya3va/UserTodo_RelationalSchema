import supabase from "../config/supabase.js";

export const createTodo = (data) => {
  return supabase.from("todos").insert([data]);
};

export const getTodosByUser = (userId) => {
  return supabase
    .from("todos")
    .select("*")
    .eq("user_id", userId);
};

export const getTodoById = (id) => {
  return supabase
    .from("todos")
    .select("*")
    .eq("id", id)
    .single();
};

export const updateTodo = (id, data) => {
  return supabase.from("todos").update(data).eq("id", id);
};

export const deleteTodo = (id) => {
  return supabase.from("todos").delete().eq("id", id);
};
