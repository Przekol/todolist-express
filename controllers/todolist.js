const toDoList = [
  { id: 1, title: 'Zrób coś' },
  { id: 2, title: 'Obiad' },
];

exports.getIndex = (req, res) => {
  res.render('todolist/index', {
    toDoList: toDoList,
    pageTitle: 'ToDo List',
    hasToDoList: toDoList.length > 0,
  });
};
