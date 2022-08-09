const TodolistModel = require("../models/todolist.model");

async function getAllData(req, res, next) {
  let todos;
  try {
    todos = await TodolistModel.getAll();
  } catch (error) {
    next(error);
    return;
  }
  res.json({
    message: " all todo get",
    todos: todos,
  });
}
async function saveTodo(req, res, next) {
  const todoText = req.body.text;
  const todo = new TodolistModel(todoText);
  let createdId;
  try {
    const result = await todo.save();
    createdId = result.insertedId;
  } catch (error) {
    next(error);
    return;
  }
  todo.id = createdId.toString();
  res.json({
    message: "todo saved",
    savedTodo: todo,
    savedId: createdId,
  });
}
async function updateTodo(req, res, next) {
  const todoText = req.body.text;
  const todoId = req.params.id;
  const todo = new TodolistModel(todoText, todoId);
  try {
    await todo.save();
  } catch (error) {
    next(error);
    return;
  }
  res.json({
    message: "todo updated",
    updatedTodo: todo,
  });
}
async function deleteTodo(req, res, next) {
  const todoId = req.params.id;
  const todo = new TodolistModel(null, todoId);
  try {
    await todo.delete();
  } catch (error) {
    next(error);
    return;
  }
  res.json({
    message: "todo deleted",
  });
}

module.exports = {
  getAllData: getAllData,
  saveTodo: saveTodo,
  updateTodo: updateTodo,
  deleteTodo: deleteTodo,
};
