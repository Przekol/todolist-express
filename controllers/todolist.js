const { TodoList } = require('../models/TodoList');
const { Task } = require('../models/Task');
const config = require('../config');
const {
  getDataFromFile,
  saveDataToFile,
} = require('../utils/files-operations');

const getTodoListFromFile = async () => {
  const todolistJSON = await getDataFromFile(config.FILE_DATA);
  if (!todolistJSON) {
    return new TodoList(todolistJSON);
  }
  const todolist = todolistJSON.map(task => new Task(task));
  return new TodoList(todolist);
};

const saveTodoListToFile = async todoList => {
  await saveDataToFile(config.FILE_DATA, todoList.getToDoList());
};

const getTodoList = async (req, res) => {
  const todoList = await getTodoListFromFile();
  res.json(todoList);
};

const getEditTask = async (req, res) => {
  const taskId = req.params.taskId;
  const todoList = await getTodoListFromFile();
  const task = todoList.getTask(taskId);
  res.json(task);
};

const postDoneTask = async (req, res) => {
  const { taskId } = req.body;
  const todoList = await getTodoListFromFile();
  todoList.doneTask(taskId);
  await saveTodoListToFile(todoList);
  res.json(todoList);
};

const postAddTask = async (req, res) => {
  const { title, description, priority } = req.body;
  const todoList = await getTodoListFromFile();
  todoList.addTask(title, description, priority);
  await saveTodoListToFile(todoList);
  res.json(todoList);
};

const postEditTask = async (req, res) => {
  const { taskId, title, description, priority } = req.body;
  const todoList = await getTodoListFromFile();
  todoList.editTask(taskId, title, description, priority);
  await saveTodoListToFile(todoList);
  res.json(todoList);
};

const postDeleteTask = async (req, res) => {
  const { taskId } = req.body;
  const todoList = await getTodoListFromFile();
  todoList.deleteTask(taskId);
  await saveTodoListToFile(todoList);
  res.json(todoList);
};

module.exports = {
  getTodoList,
  postAddTask,
  postDoneTask,
  getEditTask,
  postEditTask,
  postDeleteTask,
};
