import axios from "axios";

const apiUrl = 'http://localhost:5000/todos';

export const fetchTodosApi = async () => {
    const response = await axios.get(apiUrl);
    return response.data;
}

export const addTodoApi = async (todo) => {
    const response = await axios.post(apiUrl, todo)
    return response.data
}

export const modifyTodoApi = async (id, updatedTodo) => {
    const response = await axios.put(`${apiUrl}/${id}`, updatedTodo);
    return response.data
}

export const deleteTodoApi = async (id) => {
    const response = await axios.delete(`${apiUrl}/${id}`)
}