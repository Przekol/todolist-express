(async () => {
  const res = await fetch(`/todo`);
  const todolist = await res.json();
  renderTodoList(todolist);
})();

const renderTodoList = todolist => {
  const { todoList } = todolist;

  const toDoListElLow = document.querySelector('.to-do-list__priority--low');
  const toDoListElMedium = document.querySelector(
    '.to-do-list__priority--medium'
  );
  const toDoListElHigh = document.querySelector('.to-do-list__priority--high');
  toDoListElLow.innerHTML = '';
  toDoListElMedium.innerHTML = '';
  toDoListElHigh.innerHTML = '';

  todoList.forEach(task => {
    const { id, title, description, isDone, date, priority } = task;
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.setAttribute('id', `${id}`);

    taskDiv.setAttribute('data-done', `${isDone}`);
    taskDiv.setAttribute('data-date-added', `${date.added}`);

    const taskH2 = document.createElement('h2');
    taskH2.classList.add('title', 'h2');
    taskH2.textContent = title;

    const taskP = document.createElement('p');
    taskP.classList.add('description', 'text');
    taskP.textContent = description;

    const taskButtons = document.createElement('div');
    taskButtons.classList.add('task__buttons');
    taskButtons.setAttribute('data-id', `${id}`);
    const taskDoneButton = document.createElement('button');

    taskDoneButton.classList.add('task__button--done', 'btn', 'btn--contained');
    taskDoneButton.setAttribute('data-button', 'done');
    taskDoneButton.textContent = 'Done';
    taskButtons.appendChild(taskDoneButton);

    const taskEditButton = document.createElement('button');
    taskEditButton.classList.add('task__button--edit', 'btn', 'btn--shaded');
    taskEditButton.setAttribute('data-button', 'edit');
    taskEditButton.textContent = 'Edit';
    taskButtons.appendChild(taskEditButton);

    const taskDeleteButton = document.createElement('button');
    taskDeleteButton.setAttribute('data-button', 'delete');
    taskDeleteButton.classList.add(
      'task__button--delete',
      'btn',
      'btn--outlined'
    );
    taskDeleteButton.textContent = 'Delete';

    const dateDiv = document.createElement('div');
    dateDiv.classList.add('task__date');
    const dateAddedP = document.createElement('p');
    dateAddedP.classList.add('task__date-added');
    dateAddedP.textContent = `Date added: ${displayFormatDate(
      new Date(date.added)
    )}`;
    dateDiv.appendChild(dateAddedP);

    if (task.date.edited) {
      taskDiv.setAttribute('data-date-edited', task.date.edited);
      const dateEditedP = document.createElement('p');
      dateEditedP.classList.add('task__date-edited');
      dateEditedP.textContent = `Edited: ${displayFormatDate(
        new Date(task.date.edited)
      )}`;
      dateDiv.appendChild(dateEditedP);
    }

    taskButtons.appendChild(taskDeleteButton);
    taskDiv.appendChild(taskH2);
    taskDiv.appendChild(taskP);
    taskDiv.appendChild(taskButtons);
    taskDiv.appendChild(dateDiv);

    if (task.isDone) taskDiv.classList.add('done');
    switch (priority) {
      case 'low':
        taskDiv.classList.add('task__priority--low');
        toDoListElLow.appendChild(taskDiv);
        break;
      case 'medium':
        taskDiv.classList.add('task__priority--medium');
        toDoListElMedium.appendChild(taskDiv);
        break;
      case 'high':
        taskDiv.classList.add('task__priority--high');
        toDoListElHigh.appendChild(taskDiv);
        break;
      default:
        break;
    }
  });
};

const displayFormatDate = date => {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const locale = navigator.language;
  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0)
    return `Today, ${new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date)}`;
  if (daysPassed === 1)
    return `Yesterday, ${new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date)}`;
  if (daysPassed <= 7)
    return `${daysPassed} days ago, ${new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date)} `;
  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  }).format(date);
};

const options = (method, json) => {
  return {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(json),
  };
};
const taskModalForm = document.querySelector('.task__modal');
const toDoListEl = document.querySelector('.to-do-list');
const taskForm = document.querySelector('.task__form');
const btnTaskFormSubmit = document.querySelector('.task__form-button--submit');
let editMode = false;
const setTaskForm = (editMode, taskId = null) => {
  btnTaskFormSubmit.textContent = editMode ? 'Update Task' : 'Add Task';
  taskForm.action = editMode ? '/edit-task' : '/add-task';
  taskForm.dataset.id = taskId ? taskId : null;
};
toDoListEl.addEventListener('click', e => {
  const taskDiv = e.target.parentNode;
  const taskId = taskDiv.dataset.id;

  if (e.target.dataset.button === 'done') {
    (async () => {
      const res = await fetch(`/done-task`, options('POST', { taskId }));
      const todolist = await res.json();
      renderTodoList(todolist);
    })();
  }

  if (e.target.dataset.button === 'edit') {
    taskModalForm.classList.remove('hidden');
    editMode = true;
    setTaskForm(editMode, taskId);

    (async () => {
      const res = await fetch(`/edit-task/${taskId}`);
      const task = await res.json();
      const { title, description, priority } = task;
      console.log({ title, description, priority });
      taskForm.title.value = title;
      taskForm.description.value = description;
      taskForm.priority.value = priority;
    })();
  }
  if (e.target.dataset.button === 'delete') {
    (async () => {
      const res = await fetch(`/delete-task`, options('POST', { taskId }));
      const todolist = await res.json();
      renderTodoList(todolist);
    })();
  }
});

const btnAdd = document.querySelector('.task__button--add');
const btnTaskFormCancel = document.querySelector('.task__form-button--cancel');

btnAdd.addEventListener('click', () => {
  taskModalForm.classList.remove('hidden');
  editMode = false;
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
  if (!editMode) {
    const res = await fetch(
      `/add-task`,
      options('POST', { title, description, priority })
    );
    const todolist = await res.json();
    renderTodoList(todolist);
    taskForm.title.value = '';
    taskForm.description.value = '';
    taskForm.priority.value = 'low';
  } else {
    const res = await fetch(
      `/edit-task`,
      options('POST', { taskId, title, description, priority })
    );
    const todolist = await res.json();
    renderTodoList(todolist);
    taskForm.title.value = '';
    taskForm.description.value = '';
    taskForm.priority.value = 'low';
  }
  taskModalForm.classList.add('hidden');
});
