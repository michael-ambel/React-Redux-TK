import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './slices/todoSlice'
import loggerMiddleware from "./middlewares/loggerMiddleware";

const store = configureStore({
    reducer: {
        todos: todoReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
})

export default store;