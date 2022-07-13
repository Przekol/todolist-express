const express = require('express');
const {
  getIndex,
  getAddTask,
  postAddTask,
  postTaskDone,
  getEditTask,
  postEditTask,
  postDeleteTask,
} = require('../controllers/todolist');
const todolistRouter = express.Router();

todolistRouter
  .get('/', getIndex)
  .get('/add-task', getAddTask)
  .post('/add-task', postAddTask)
  .post('/done-task', postTaskDone)
  .get('/edit-task/:taskId', getEditTask)
  .post('/edit-task', postEditTask)
  .post('/delete-task', postDeleteTask);

module.exports = {
  todolistRouter,
};
