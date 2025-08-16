const items = document.querySelector('.items');
const newForm = document.querySelector('.new__form');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__btn');

function onAdd() {
  const text = input.value;
  if (text.trim() === '') {
    input.value = '';
    input.focus();
    return;
  }

  const item = createItem(text);
  items.appendChild(item);

  item.scrollIntoView({ block: 'center' });
  // items.scrollTop = items.scrollHeight;

  input.value = '';
  input.focus();
}

let id = 0;
function createItem(text) {
  const itemRow = document.createElement('li');
  itemRow.className = 'item__row';
  itemRow.setAttribute('data-id', id);

  itemRow.innerHTML = `
    <span class = "item__name">${text}</span>
    <button class = "item__btn">
      <i class="fa-solid fa-user-astronaut" data-id = ${id}></i>
    </button>
  `;

  id++;
  return itemRow;
}

newForm.addEventListener('submit', (e) => {
  e.preventDefault();
  onAdd();
});

items.addEventListener('click', (e) => {
  const id = e.target.dataset.id;
  if (id) {
    const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
    toBeDeleted.remove();
  }
});
