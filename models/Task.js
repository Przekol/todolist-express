const { ValueGenerator } = require('../utils/ValueGenerator');

class Task {
  constructor(title, description, priority) {
    this.id = ValueGenerator.getGeneratedId();
    this.title = title;
    this.description = description;
    this.isDone = false;
    this.date = {
      added: ValueGenerator.getCurrentDate(),
      edited: null,
    };
    this.priority = priority;
  }

  setTitle(title) {
    this.title = title;
  }
  setDescription(description) {
    this.description = description;
  }
  setIsDone(isDone) {
    this.isDone = isDone;
  }
  setDateEdited(dateEdited) {
    this.date.edited = dateEdited;
  }
  setPriority(priority) {
    this.priority = priority;
  }
  getId() {
    return this.id;
  }
  getTitle() {
    return this.title;
  }
  getDescription() {
    return this.description;
  }
  getIsDone() {
    return this.isDone;
  }
  getDate() {
    return this.date;
  }
  getPriority() {
    return this.priority;
  }
  getInfoOfTask() {
    return {
      id: this.getId(),
      title: this.getTitle(),
      description: this.getDescription(),
      isDone: this.getIsDone(),
      date: this.getDate(),
      priority: this.getPriority(),
    };
  }
}

module.exports = {
  Task,
};
