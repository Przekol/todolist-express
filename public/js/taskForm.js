import { renderTodoList } from './renderTodoList.js';
import { getFetch } from './utils/fetch.js';

const taskModalForm = document.querySelector('.task__modal');
const taskForm = document.querySelector('.task__form');
const btnTaskFormSubmit = document.querySelector('.task__form-button--submit');
const btnOpenTaskForm = document.querySelector('.task__button--open-form');
const btnTaskFormCancel = document.querySelector('.task__form-button--cancel');
const taskFormError = document.querySelector('.task__form-error');

let editMode = false;

export const getEditMode = () => editMode;
export const setEditMode = mode => {
  editMode = mode;
};

export const setTaskForm = (isEdit, taskId = null) => {
  btnTaskFormSubmit.textContent = isEdit ? 'Update Task' : 'Add Task';
  taskForm.action = isEdit ? '/edit-task' : '/add-task';
  taskForm.dataset.id = taskId || null;
  taskFormError.innerText = '';
};

btnOpenTaskForm.addEventListener('click', () => {
  taskModalForm.classList.remove('hidden');
  setEditMode(false);
  setTaskForm(editMode);
});

btnTaskFormCancel.addEventListener('click', () => {
  taskModalForm.classList.add('hidden');
});

taskForm.addEventListener('submit', async event => {
  event.preventDefault();
  const taskId = taskForm.dataset.id;
  const title = taskForm.title.value;
  const description = taskForm.description.value;
  const priority = taskForm.priority.value;

  if (!title || !description) {
    taskFormError.innerText = 'All fields must be completed!';
    return;
  }
  if (!editMode) {
    const todoList = await getFetch('/add-task', 'POST', {
      title,
      description,
      priority,
    });
    renderTodoList(todoList);
  } else {
    const todoList = await getFetch('/edit-task', 'POST', {
      taskId,
      title,
      description,
      priority,
    });
    renderTodoList(todoList);
  }
  taskForm.title.value = '';
  taskForm.description.value = '';
  taskForm.priority.value = 'low';
  taskModalForm.classList.add('hidden');
  taskFormError.innerText = '';
});
