const express = require('express');
const todoController = require('../controllers/todolist');
const todolistRouter = express.Router();

todolistRouter.get('/', todoController.getIndex);

module.exports = {
  todolistRouter,
};
