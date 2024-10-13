import { createSlice } from "@reduxjs/toolkit";
import { fetchTodos, addTodo, modifyTodo, deleteTodo } from "../asyncThunks/todosAsync";


const todosSlice = createSlice({
    name: 'todos',
    initialState: {items: [], loading: false, error: null },
    extraReducers:(builder) => {
        builder
        .addCase(fetchTodos.pending, (state, action) => {
            state.loading = true
        })

        .addCase(fetchTodos.fulfilled, (state, action) => {
            state.items = action.payload;
            state.loading = false;
        })

        .addCase(fetchTodos.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })

        .addCase(addTodo.pending, (state) => {
            state.loading = true; // Set loading state when the addTodo request is in progress
          })
        .addCase(addTodo.fulfilled, (state, action) => {
            state.items.push(action.payload);  // Add the new todo to the state when the request is successful
            state.loading = false;
          })
        .addCase(addTodo.rejected, (state, action) => {
            state.error = action.error.message; // Handle error if the request fails
            state.loading = false;
          })

        .addCase(modifyTodo.fulfilled, (state, action) => {
            const index = state.items.findIndex((todo) => todo.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
        }
        })
        .addCase(deleteTodo.fulfilled, (state, action) => {
            state.items = state.items.filter((todo) => todo.id !== action.payload);
        });
    },
})

export default todosSlice.reducer