// function
// localstorage ->  dark, category (딱 한번만 저장하면 되는 데이터)
// localstorage -> checked, text, id,
//filter
//dark/light
//checkbox
//add
//remove

// Localstore
// get local data (load data)

const todoItems = document.querySelector('.main__items');
const form = document.querySelector('#footer__form');
const input = document.querySelector('#footer__input');

// Initalise data
function initaliseData(key, defaultValue) {
  const stored = localStorage.getItem(key);
  if (stored) {
    return JSON.parse(stored);
  } else {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
}

let theme = initaliseData('theme', 'light');
let filter = initaliseData('filter', 'all');
let todos = initaliseData('todos', []);

function renderTodos() {
  todos.forEach((todo) => {
    const item = createTodoItem(todo);
    todoItems.appendChild(item);
  });
}
renderTodos();

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function onAdd() {
  let text = input.value.trim();
  if (!text) {
    input.value = '';
    input.focus();
    return;
  }

  const newTodo = setTodoData(text);
  const item = createTodoItem(newTodo);
  todoItems.appendChild(item);
  input.value = '';
  input.focus();
}

function setTodoData(text) {
  let id = self.crypto.randomUUID();
  const newTodo = {
    id,
    text,
    completed: false,
  };
  todos.push(newTodo);
  saveTodos();

  return newTodo;
}

function createTodoItem(todo) {
  const item = document.createElement('li');
  item.setAttribute('class', 'items__row');
  item.setAttribute('data-id', todo.id);
  item.innerHTML = `
    <label for="${todo.id}" class="row__label">
        <input type="checkbox" class="row__checkbox" id="${todo.id}" ${
    todo.completed ? 'checked' : ''
  } data-check="${todo.id}"/>
        <span>${todo.text}</span>
    </label>
    <button class="row__button">
        <i class="fa-solid fa-trash" data-id="${todo.id}"></i>
    </button>
  `;

  return item;
}

function onDelete(target) {
  let id = target.dataset.id;
  const deletedItem = document.querySelector(`li[data-id="${id}"]`);
  deletedItem.remove();

  todos = todos.filter((todo) => {
    return todo.id != id;
  });
}

function onChecked() {}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  onAdd();
});

todoItems.addEventListener('click', (e) => {
  if (!e.target.dataset.id) return;
  onDelete(e.target);
  saveTodos();
});

todoItems.addEventListener('change', (e) => {
  if (!e.target.dataset.check) return;

  const checkedTodo = todos.find((todo) => todo.id == e.target.dataset.check);
  checkedTodo.completed = e.target.checked;

  saveTodos();
});

const filterBtns = document.querySelector('.header__categories');

filterBtns.addEventListener('click', (e) => {
  const target = e.target.dataset.category;
  const visibleItem = todoItems.querySelectorAll('.items__row');
  if (!target) return;
  visibleItem.forEach((li) => (li.style.display = 'none'));

  if (target === 'active') {
    let activeTodos = todos.filter((todo) => {
      return todo.completed === false;
    });

    activeTodos.forEach((item) => {
      const li = document.querySelector(`li[data-id="${item.id}"]`);
      li.style.display = 'flex';
    });
  }
});
