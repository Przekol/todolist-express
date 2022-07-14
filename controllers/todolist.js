const { TodoList } = require('../models/TodoList');
const { Task } = require('../models/Task');

const getIndex = (req, res) => {
  res.render('todolist/index', {
    toDoList: TodoList.getToDoList(),
    pageTitle: 'Todo List',
    hasToDoList: TodoList.getToDoList().length > 0,
  });
};

const getAddTask = (req, res) => {
  res.render('todolist/edit-task', {
    pageTitle: 'Add Task',
    editing: false,
  });
};

const getEditTask = (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) return res.redirect('/');
  const taskId = req.params.taskId;
  const task = TodoList.getTask(taskId);
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

const postDoneTask = (req, res) => {
  const { taskId } = req.body;
  TodoList.doneTask(taskId);

  res.redirect('/');
};

const postAddTask = (req, res) => {
  const { title, description, priority } = req.body;
  TodoList.addTask(new Task(title, description, priority));
  res.redirect('/');
};

const postEditTask = (req, res) => {
  const { taskId, title, description, priority } = req.body;
  TodoList.editTask(taskId, title, description, priority);
  res.redirect('/');
};

const postDeleteTask = (req, res) => {
  const taskId = req.body.taskId;
  TodoList.deleteTask(taskId);
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
