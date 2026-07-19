import info from './info';

const text = document.createElement('text');

text.textContent = info;

document.body.appendChild(text);

document.addEventListener('click', () => {
  import('./show-msg');
});

module.hot.accept('./info', () => {
  text.textContent = info;
});
