import { render } from 'solid-js/web';
import { Counter } from './components/Counter';

const root =
  document.getElementById('root') ?? document.body.appendChild(document.createElement('div'));
root.id = 'root';

render(() => <Counter initialValue={1} />, root);
