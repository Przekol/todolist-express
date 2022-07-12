const express = require('express');
const todoController = require('../controllers/todolist');
const todolistRouter = express.Router();

todolistRouter
  .get('/', todoController.getIndex)
  .get('/add-task', todoController.getAddTask)
  .post('/add-task', todoController.postAddTask)
  .post('/done-task', todoController.postTaskDone)
  .get('/edit-task/:taskId', todoController.getEditTask)
  .post('/edit-task', todoController.postEditTask)
  .post('/delete-task', todoController.postDeleteTask);

module.exports = {
  todolistRouter,
};
