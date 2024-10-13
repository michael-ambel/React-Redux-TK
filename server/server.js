const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors');
app.use(cors());

const PORT = 5000;

// Middleware to parse JSON body
app.use(express.json());

const filePath = path.join(__dirname, 'data', 'todos.json');

// Helper function to read data
const readTodos = () => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

// Helper function to write data
const writeTodos = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Get all todos
app.get('/todos', (req, res) => {
  const todos = readTodos();
  res.json(todos);
});

// Add a new todo
app.post('/todos', (req, res) => {
  const todos = readTodos();
  const newTodo = { ...req.body, id: todos.length + 1 };
  todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
});

// Modify a todo
app.put('/todos/:id', (req, res) => {
  const todos = readTodos();
  const todoIndex = todos.findIndex((todo) => todo.id === parseInt(req.params.id));

  if (todoIndex !== -1) {
    todos[todoIndex] = { ...todos[todoIndex], ...req.body };
    writeTodos(todos);
    res.json(todos[todoIndex]);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
  let todos = readTodos();
  const newTodos = todos.filter((todo) => todo.id !== parseInt(req.params.id));

  if (newTodos.length === todos.length) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  writeTodos(newTodos);
  res.json({ message: 'Todo deleted' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});