const items = document.querySelector('.items');
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

function createItem(text) {
  const itemRow = document.createElement('li');
  itemRow.className = 'item__row';

  const name = document.createElement('span');
  name.className = 'item__name';
  name.innerText = text;

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'item__btn';
  deleteBtn.innerHTML = '<i class="fa-solid fa-user-astronaut"></i>';
  deleteBtn.addEventListener('click', () => {
    items.removeChild(itemRow);
  });

  itemRow.appendChild(name);
  itemRow.appendChild(deleteBtn);

  return itemRow;
}

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.isComposing) {
    onAdd();
  }
});

addBtn.addEventListener('click', () => {
  onAdd();
});
