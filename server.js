const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/todo-list', { useNewUrlParser: true });

const TodoSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.model('Todo', TodoSchema);


const app = express();
app.use(bodyParser.json());


app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});


app.post('/todos', async (req, res) => {
  const { description } = req.body;
  const todo = new Todo({ description });
  await todo.save();
  res.json(todo);
});


app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
});


app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.json({ message: 'Todo deleted' });
});


app.listen(3000, () => console.log('Server started on port 3000'));
