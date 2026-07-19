import './index.css';
import { answer } from './answer.js';
function render() {
  document.getElementById('root').innerHTML =
    `<div class="universe">the answer to the universe is <span class="answer">${answer}</span></div>`;
}
render();
