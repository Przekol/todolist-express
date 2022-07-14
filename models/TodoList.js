const { Task } = require('./Task');
const { ValueGenerator } = require('../utils/valueGenerator');

class TodoList {
  static todoList = [];

  static setToDoList(toDoList) {
    this.todoList = toDoList;
  }
  static getToDoList() {
    return this.todoList;
  }
  static addTask(task) {
    if (task instanceof Task) {
      this.todoList.push(task);
    } else {
      throw new Error('Object in toDoList catalog should be of Task type!');
    }
  }
  static deleteTask(taskId) {
    const updatedTodoList = this.todoList.filter(task => task.id !== taskId);
    TodoList.setToDoList(updatedTodoList);
  }
  static editTask(taskId, title, description, priority) {
    const task = this.todoList.find(task => task.id === taskId);
    task.setTitle(title);
    task.setDescription(description);
    task.setPriority(priority);
    task.setDateEdited(ValueGenerator.getCurrentDate());
  }
  static doneTask(taskId) {
    const task = this.todoList.find(task => task.id === taskId);
    task.setIsDone(true);
  }

  static getTask(taskId) {
    const task = this.todoList.find(task => task.id === taskId);
    return task.getInfoOfTask();
  }
}

module.exports = {
  TodoList,
};
