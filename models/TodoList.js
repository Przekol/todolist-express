const { Task } = require('./Task');
const { ValueGenerator } = require('../utils/valueGenerator');

class TodoList {
  constructor(todolist) {
    this.todoList = todolist || [];
  }

  setToDoList(toDoList) {
    this.todoList = toDoList;
  }
  getToDoList() {
    return this.todoList;
  }
  addTask(title, description, priority) {
    const task = new Task();
    task.createTask(title, description, priority);

    this.todoList.push(task.getInfoOfTask());
  }
  deleteTask(taskId) {
    const updatedTodoList = this.todoList.filter(task => task.id !== taskId);
    this.setToDoList(updatedTodoList);
  }
  editTask(taskId, title, description, priority) {
    const task = this.todoList.find(task => task.id === taskId);
    task.setTitle(title);
    task.setDescription(description);
    task.setPriority(priority);
    task.setDateEdited(ValueGenerator.getCurrentDate());
  }
  doneTask(taskId) {
    const task = this.todoList.find(task => task.id === taskId);
    task.setIsDone(true);
  }

  getTask(taskId) {
    return this.todoList.find(task => task.id === taskId);
  }
}

module.exports = {
  TodoList,
};
