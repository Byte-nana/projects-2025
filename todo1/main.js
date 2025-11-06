const inputForm = document.querySelector('#form__input');
const ulMain = document.querySelector('.main__lists');
const formMain = document.querySelector('#main__form');

function onAdd() {
  const text = inputForm.value;
  if (text.trim() == '') {
    inputForm.value = '';
    inputForm.focus();
    return;
  }

  const newLi = createElement(text);
  ulMain.appendChild(newLi);
  newLi.scrollIntoView({ block: 'center' });

  inputForm.value = '';
  inputForm.focus();
}

let id = 0;
let check = 0;
function createElement(text) {
  const li = document.createElement('li');
  li.setAttribute('class', 'lists__item');
  li.setAttribute('data-id', id);

  const checkboxId = `checkbox-${check}`;

  li.innerHTML = `
    <input type="checkbox" id="${checkboxId}" class="item__checkbox" data-check = ${check}/>
    <label for="${checkboxId}" class="item__tick"></label>
    <span class="item__content" data-check = ${check}>${text}</span>
    <button class="item__deleteBtn" type="button">
      <i class="fa-solid fa-meteor" data-id = ${id}></i>
    </button>
  `;
  id++;
  check++;
  return li;
}

formMain.addEventListener('submit', (e) => {
  e.preventDefault();
  onAdd();
});

ulMain.addEventListener('click', (e) => {
  const id = e.target.dataset.id;
  if (id) {
    const toBeDeleted = document.querySelector(
      `.lists__item[data-id = "${id}"]`
    );
    toBeDeleted.remove();
  }
});

ulMain.addEventListener('change', (e) => {
  const check = e.target.dataset.check;
  if (check) {
    const span = document.querySelector(
      `.item__content[data-check = "${check}"]`
    );
    return span;
  }
  if (e.target.checked) {
    span.style.textDecoration = 'line-through';
  } else {
    span.style.textDecoration = 'none';
  }
});
