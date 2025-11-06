'use strict';

//function
//3. check todo list
//4. remove todo list
//5. filter todo list - all, active, completed
//6. dark/light mode

const todoItems = document.querySelector('.main__items');
const form = document.querySelector('#footer__form');
const textInput = document.querySelector('#footer__input');

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
  const filterBtns = document.querySelectorAll(`button[data-category]`);
  filterBtns.forEach((btn) => {
    if (btn.dataset.category !== filter) {
      btn.classList.remove('category--selected');
    } else {
      btn.classList.add('category--selected');
    }
  });
}
renderData();

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

  item.innerHTML = `
    <label class="row__label">
        <input type="checkbox" class="row__checkbox"/>
        <span>${todo.text}</span>
    </label>
    <button class="row__button">
        <i class="fa-solid fa-trash" data-id=></i>
    </button>
  `;

  return item;
}
