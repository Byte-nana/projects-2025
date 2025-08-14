const ul = document.querySelector('.contentBox__items');
const input = document.querySelector('.footer__textBox');
const enterBtn = document.querySelector('.footer__btn');

// creating html tags
function addItem(text) {
  const li = document.createElement('li');
  li.className = 'contentBox__item';

  const span = document.createElement('span');
  span.className = 'item__text';
  span.textContent = text;

  const button = document.createElement('button');
  button.className = 'item__btn';

  const i = document.createElement('i');
  i.className = 'fa-solid fa-user-astronaut';

  button.append(i);
  li.append(span, button);
  ul.append(li);
  // auto-scroll to the newest item
  const contentBox = document.querySelector('.shopping__contentBox');
  contentBox.scrollTop = contentBox.scrollHeight;
  // initalise the input
  input.value = '';

  // li.innerHTML = `
  //   <span class="item__text">${text}</span>
  //   <button class="item__btn">
  //       <i class="fa-solid fa-user-astronaut"></i>
  //   </button>
  //   `;
}

// input event
// 한국어 입력하면 엔터키 2번 쳐지는 경우 발생 => e.isComposing
// 빈 공간이 입력되면 가지 않게 하기 => trim() => ?이렇게 되면 초기화가 되지 않는다. input.value=''로 설정
// 엔터를 친 후 input안에 썼던 내용 사라지게 하기 => input.value = '' (함수에다 설정)
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.isComposing) {
    if (input.value.trim() === '') {
      input.value = '';
    } else {
      addItem(input.value);
    }
  }
});
// button event
enterBtn.addEventListener('click', (e) => {
  if (input.value.trim() === '') {
    input.value = '';
  } else {
    addItem(input.value);
  }
});
//remove event
ul.addEventListener('click', (e) => {
  const btn = e.target.closest('.item__btn');
  const item = btn.closest('.contentBox__item');

  if (!btn) {
    return;
  } else if (item) {
    item.remove();
  }
});
