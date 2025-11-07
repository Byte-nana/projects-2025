'use strict';

//function
//6. dark/light mode

const todoItems = document.querySelector('.main__items');
const form = document.querySelector('#footer__form');
const textInput = document.querySelector('#footer__input');
const filterBtns = document.querySelector('.header__categories');
const themeToggleBtn = document.querySelector('.header__button');
const body = document.querySelector('body');

//store data on localStorage (when refresh it, still have data)
//1. get data from localStorage (dark/light, filter, todos)
function getData(key, defaultValue) {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  } else {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
}
//1-1. if not, initalise default data
let theme = getData('theme', 'light');
let filter = getData('filter', 'all');
let todos = getData('todos', []);

//2. render data(show on UI)
//2-1. todo items
function renderData() {
  todos.forEach((todo) => todoItems.appendChild(createTodoItem(todo)));
  //2-2. filter selected
  renderActiveButton();
  //2-3. filter
  hidesTodos();
  const todoStatus = filterTodos(filter);
  showTodos(todoStatus);
  //2-4. theme
  body.className = theme;
}
renderData();

function renderActiveButton() {
  const filterBtns = document.querySelectorAll(`button[data-category]`);
  filterBtns.forEach((btn) => {
    if (btn.dataset.category !== filter) {
      btn.classList.remove('category--selected');
    } else {
      btn.classList.add('category--selected');
    }
  });
}

//3. save data (update)
function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

//2. Add todo list (enter or button)
form.addEventListener('submit', (e) => {
  e.preventDefault();
  let text = textInput.value.trim();
  if (!text) {
    textInput.value = '';
    textInput.focus();
    return;
  }

  onAdd(text);
  textInput.value = '';
  textInput.focus();
});

function onAdd(text) {
  const newTodo = setTodoData(text);
  const item = createTodoItem(newTodo);
  todoItems.appendChild(item);
}

function setTodoData(text) {
  let id = self.crypto.randomUUID();
  const newTodo = {
    id,
    text,
    completed: false,
  };
  todos.push(newTodo);
  saveData('todos', todos);

  return newTodo;
}

function createTodoItem(todo) {
  const item = document.createElement('li');
  item.setAttribute('class', 'items__row');
  item.setAttribute('data-id', todo.id);

  item.innerHTML = `
    <label for="${todo.id}" class="row__label">
        <input type="checkbox" class="row__checkbox" id="${
          todo.id
        }" data-check="${todo.id}" ${todo.completed ? 'checked' : ''}/>
        <span>${todo.text}</span>
    </label>
    <button class="row__button">
        <i class="fa-solid fa-trash" data-id="${todo.id}"></i>
    </button>
  `;

  return item;
}

//3. check todo list
todoItems.addEventListener('change', (e) => {
  const id = e.target.dataset.check;
  if (!id) return;

  onCheck(e.target);
  saveData('todos', todos);
});

function onCheck(target) {
  const checkTodo = todos.find((todo) => {
    return todo.id === target.dataset.check;
  });
  checkTodo.completed = target.checked;
}

//4. remove todo list
todoItems.addEventListener('click', (e) => {
  const id = e.target.dataset.id;
  if (!id) return;

  onDelete(e.target);
});

function onDelete(target) {
  const deleteItem = document.querySelector(
    `li[data-id="${target.dataset.id}"]`
  );
  deleteItem.remove();
  todos = todos.filter((todo) => {
    return todo.id !== target.dataset.id;
  });
  saveData('todos', todos);
}

//5. filter todo list - all, active, completed
filterBtns.addEventListener('click', (e) => {
  const category = e.target.dataset.category;
  if (!e.target.dataset.category) return;

  handleActiveMenu(e.target);
  handleVisibleTodo(category);
});

function handleActiveMenu(target) {
  const activeMenu = document.querySelector('.category--selected');
  activeMenu.classList.remove('category--selected');
  target.classList.add('category--selected');
}

function handleVisibleTodo(checkStatus) {
  hidesTodos();
  const todoStatus = filterTodos(checkStatus);
  showTodos(todoStatus);
}

function hidesTodos() {
  const items = todoItems.querySelectorAll('.items__row');
  items.forEach((todo) => (todo.style.display = 'none'));
}

function filterTodos(checkStatus) {
  let todoStatus;
  switch (checkStatus) {
    case 'active':
      todoStatus = todos.filter((todo) => todo.completed === false);
      saveData('filter', 'active');
      break;
    case 'completed':
      todoStatus = todos.filter((todo) => todo.completed === true);
      saveData('filter', 'completed');
      break;
    case 'all':
      todoStatus = todos;
      saveData('filter', 'all');
      break;
  }
  return todoStatus;
}

function showTodos(todoStatus) {
  todoStatus.forEach((todo) => {
    const visibleTodo = document.querySelector(`li[data-id="${todo.id}"]`);
    visibleTodo.style.display = 'flex';
  });
}

//dark/light mode
themeToggleBtn.addEventListener('click', () => {
  const themeColour = body.classList.contains('light') ? 'dark' : 'light';
  body.className = themeColour;
  saveData('theme', themeColour);
});
