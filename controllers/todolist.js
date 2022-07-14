const { TodoList } = require('../models/TodoList');
const { Task } = require('../models/Task');
const config = require('../config');
const {
  getDataFromFile,
  saveDataToFile,
} = require('../utils/files-operations');

const getTodoList = async () => {
  const todolistJSON = await getDataFromFile(config.FILE_DATA);
  if (!todolistJSON) {
    return new TodoList(todolistJSON);
  }
  const todolist = todolistJSON.map(task => new Task(task));
  return new TodoList(todolist);
};

const saveTodoList = async todoList => {
  await saveDataToFile(config.FILE_DATA, todoList.getToDoList());
};

const getIndex = async (req, res) => {
  const todoList = await getTodoList();
  res.render('todolist/index', {
    toDoList: todoList.getToDoList(),
    pageTitle: 'Todo List',
    hasToDoList: todoList.getToDoList().length > 0,
  });
};

const getAddTask = (req, res) => {
  res.render('todolist/edit-task', {
    pageTitle: 'Add Task',
    editing: false,
  });
};

const getEditTask = async (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) return res.redirect('/');
  const taskId = req.params.taskId;
  const todoList = await getTodoList();
  const task = todoList.getTask(taskId);
  res.render('todolist/edit-task', {
    pageTitle: 'Edit Task',
    editing: editMode,
    task: task,
    priority: {
      low: task.priority === 'low',
      medium: task.priority === 'medium',
      high: task.priority === 'high',
    },
  });
};

const postDoneTask = async (req, res) => {
  const { taskId } = req.body;
  const todoList = await getTodoList();
  todoList.doneTask(taskId);
  await saveTodoList(todoList);
  res.redirect('/');
};

const postAddTask = async (req, res) => {
  const { title, description, priority } = req.body;
  const todoList = await getTodoList();
  todoList.addTask(title, description, priority);
  await saveTodoList(todoList);
  res.redirect('/');
};

const postEditTask = async (req, res) => {
  const { taskId, title, description, priority } = req.body;
  const todoList = await getTodoList();
  todoList.editTask(taskId, title, description, priority);
  await saveTodoList(todoList);
  res.redirect('/');
};

const postDeleteTask = async (req, res) => {
  const taskId = req.body.taskId;
  const todoList = await getTodoList();
  todoList.deleteTask(taskId);
  await saveTodoList(todoList);
  res.redirect('/');
};

module.exports = {
  getIndex,
  getAddTask,
  postAddTask,
  postDoneTask,
  getEditTask,
  postEditTask,
  postDeleteTask,
};
