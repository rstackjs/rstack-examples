import info from './info.js';

const text = document.createElement('text');

text.textContent = info;

document.body.appendChild(text);

document.addEventListener('click', () => {
  import('./show-msg.js');
});

module.hot.accept('./info', () => {
  text.textContent = info;
});
