import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos, deleteTodo, modifyTodo } from '../store/asyncThunks/todosAsync';

const TodoList = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Todo List</h2>
      <ul>
        {items.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => dispatch(modifyTodo({ id: todo.id, updatedTodo: { ...todo, completed: !todo.completed } }))}>
              {todo.completed ? 'Uncomplete' : 'Complete'}
            </button>
            <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;