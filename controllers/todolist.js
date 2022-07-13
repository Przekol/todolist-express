const toDoList = [
  {
    id: 10,
    title: 'Zrób coś',
    description: 'Naucz się w końcu!',
    isDone: false,
    date: { added: new Date().toISOString(), edited: new Date().toISOString() },
    priority: 'low',
  },
  {
    id: 20,
    title: 'Obiad',
    description: 'Naucz się w końcu!',
    isDone: false,
    date: { added: new Date().toISOString() },
    priority: 'medium',
  },
  {
    id: 30,
    title: 'Kolacja',
    description: 'Naucz się w końcu!',
    isDone: true,
    date: { added: new Date().toISOString() },
    priority: 'high',
  },
];

const getIndex = (req, res) => {
  res.render('todolist/index', {
    toDoList: toDoList,
    pageTitle: 'ToDo List',
    hasToDoList: toDoList.length > 0,
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
  const task = toDoList.find(task => task.id === Number(taskId));
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

const postTaskDone = (req, res) => {
  const { taskId } = req.body;
  const task = toDoList.find(task => task.id === Number(taskId));
  task.isDone = true;

  res.redirect('/');
};

const postAddTask = (req, res) => {
  const { title, description, priority } = req.body;
  toDoList.push({
    id: 50,
    title: title,
    description: description,
    isDone: false,
    date: { added: new Date().toISOString() },
    priority: priority,
  });
  res.redirect('/');
};

const postEditTask = (req, res) => {
  const { taskId, title, description, priority } = req.body;
  const task = toDoList.find(task => task.id === Number(taskId));
  task.title = title;
  task.description = description;
  task.priority = priority;
  task.date.edited = new Date().toISOString();
  res.redirect('/');
};

const postDeleteTask = (req, res) => {
  const taskId = req.body.taskId;
  toDoList.forEach((task, index) => {
    if (task.id === Number(taskId)) {
      toDoList.splice(index, 1);
    }
  });
  res.redirect('/');
};

module.exports = {
  getIndex,
  getAddTask,
  postAddTask,
  postTaskDone,
  getEditTask,
  postEditTask,
  postDeleteTask,
};
