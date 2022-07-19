import { renderTodoList } from './renderTodoList.js';
import { getFetch } from './utils/fetch.js';
import { getEditMode, setEditMode, setTaskForm } from './taskForm.js';

const taskModalForm = document.querySelector('.task__modal');
const toDoListEl = document.querySelector('.to-do-list');
const taskForm = document.querySelector('.task__form');

toDoListEl.addEventListener('click', async e => {
  const taskDiv = e.target.parentNode;
  const taskId = taskDiv.dataset.id;

  if (e.target.dataset.button === 'done') {
    const todoList = await getFetch('/done-task', 'POST', {
      taskId,
    });
    renderTodoList(todoList);
  }

  if (e.target.dataset.button === 'edit') {
    taskModalForm.classList.remove('hidden');
    setEditMode(true);
    setTaskForm(getEditMode(), taskId);

    const task = await getFetch(`/edit-task/${taskId}`, 'GET');
    const { title, description, priority } = task;
    taskForm.title.value = title;
    taskForm.description.value = description;
    taskForm.priority.value = priority;
  }
  if (e.target.dataset.button === 'delete') {
    const todoList = await getFetch(`/delete-task`, 'POST', { taskId });
    renderTodoList(todoList);
  }
});
const getTodoList = async () => {
  const todoList = await getFetch('/todo', 'GET');
  renderTodoList(todoList);
};

try {
  await getTodoList();
} catch (error) {
  throw new Error(error);
}
