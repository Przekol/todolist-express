import { displayFormatDate } from './utils/formatDate.js';

const todoListElLow = document.querySelector('.to-do-list__priority--low');
const todoListElMedium = document.querySelector(
  '.to-do-list__priority--medium'
);
const todoListElHigh = document.querySelector('.to-do-list__priority--high');

export const renderTodoList = todolist => {
  const { todoList } = todolist;

  todoListElLow.innerHTML = '';
  todoListElMedium.innerHTML = '';
  todoListElHigh.innerHTML = '';

  todoList.forEach(task => {
    const { id, title, description, isDone, date, priority } = task;
    const taskEl = document.createElement('div');
    taskEl.classList.add('task');
    taskEl.setAttribute('id', `${id}`);

    taskEl.setAttribute('data-done', `${isDone}`);
    taskEl.setAttribute('data-date-added', `${date.added}`);

    const taskTitleEl = document.createElement('h2');
    taskTitleEl.classList.add('title', 'h2');
    taskTitleEl.textContent = title;

    const taskDescriptionEl = document.createElement('p');
    taskDescriptionEl.classList.add('description', 'text');
    taskDescriptionEl.textContent = description;

    const taskButtonsEl = document.createElement('div');
    taskButtonsEl.classList.add('task__buttons');
    taskButtonsEl.setAttribute('data-id', `${id}`);

    const taskDoneButtonEl = document.createElement('button');
    taskDoneButtonEl.classList.add(
      'task__button--done',
      'btn',
      'btn--contained'
    );
    taskDoneButtonEl.setAttribute('data-button', 'done');
    taskDoneButtonEl.textContent = 'Done';
    taskButtonsEl.appendChild(taskDoneButtonEl);

    const taskEditButtonEl = document.createElement('button');
    taskEditButtonEl.classList.add('task__button--edit', 'btn', 'btn--shaded');
    taskEditButtonEl.setAttribute('data-button', 'edit');
    taskEditButtonEl.textContent = 'Edit';
    taskButtonsEl.appendChild(taskEditButtonEl);

    const taskDeleteButtonEl = document.createElement('button');
    taskDeleteButtonEl.setAttribute('data-button', 'delete');
    taskDeleteButtonEl.classList.add(
      'task__button--delete',
      'btn',
      'btn--outlined'
    );
    taskDeleteButtonEl.textContent = 'Delete';

    const taskDateEl = document.createElement('div');
    taskDateEl.classList.add('task__date');

    const taskDateAddedEl = document.createElement('p');
    taskDateAddedEl.classList.add('task__date-added');
    taskDateAddedEl.textContent = `Date added: ${displayFormatDate(
      new Date(date.added)
    )}`;
    taskDateEl.appendChild(taskDateAddedEl);
    if (task.date.edited) {
      taskEl.setAttribute('data-date-edited', task.date.edited);
      const taskDateEditedEl = document.createElement('p');
      taskDateEditedEl.classList.add('task__date-edited');
      taskDateEditedEl.textContent = `Edited: ${displayFormatDate(
        new Date(task.date.edited)
      )}`;
      taskDateEl.appendChild(taskDateEditedEl);
    }

    taskButtonsEl.appendChild(taskDeleteButtonEl);
    taskEl.appendChild(taskTitleEl);
    taskEl.appendChild(taskDescriptionEl);
    taskEl.appendChild(taskButtonsEl);
    taskEl.appendChild(taskDateEl);

    if (task.isDone) {
      taskEl.classList.add('done');
      taskDoneButtonEl.classList.add('disabled');
      taskDoneButtonEl.setAttribute('disabled', 'disabled');
      taskEditButtonEl.classList.add('disabled');
      taskEditButtonEl.setAttribute('disabled', 'disabled');
    }

    switch (priority) {
      case 'low':
        taskEl.classList.add('task__priority--low');
        todoListElLow.appendChild(taskEl);
        break;
      case 'medium':
        taskEl.classList.add('task__priority--medium');
        todoListElMedium.appendChild(taskEl);
        break;
      case 'high':
        taskEl.classList.add('task__priority--high');
        todoListElHigh.appendChild(taskEl);
        break;
      default:
        break;
    }
  });
};
