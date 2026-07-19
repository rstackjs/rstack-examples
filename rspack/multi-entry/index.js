import { something } from './static.js';
const a = 10;
async function render() {
  import('./answer.js').then((x) => {
    console.log('x:', x);
  });
  console.log('a:', a);
  console.log('static:', something);
  document.getElementById('root').innerHTML = a;
}

render();
