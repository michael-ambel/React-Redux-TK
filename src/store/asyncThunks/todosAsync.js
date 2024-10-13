import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTodosApi, addTodoApi, modifyTodoApi, deleteTodoApi } from "../../api/todosApi";

//Async Thunk
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const todos = await fetchTodosApi()
    return todos;
})

export const addTodo = createAsyncThunk('todos/addTodo', async (newTodo) => {
    const todo = await addTodoApi(newTodo);
    return todo;
  });

  export const modifyTodo = createAsyncThunk('todos/modifyTodo', async ({ id, updatedTodo }) => {
    const todo = await modifyTodoApi(id, updatedTodo);
    return todo;
  });

  export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
    await deleteTodoApi(id);
    return id;
  });