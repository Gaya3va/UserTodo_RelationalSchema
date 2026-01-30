import supabase from "../config/supabase.js";

export const createUser = (data) => {
  return supabase.from("users").insert([data]);
};

export const getAllUsers = () => {
  return supabase.from("users").select("*");
};

export const getUserById = (id) => {
  return supabase.from("users").select("*").eq("id", id).single();
};

export const deleteUser = (id) => {
  return supabase.from("users").delete().eq("id", id);
};

export const findByEmail = (email) => {
  return supabase.from("users").select("*").eq("email", email).single();
};
