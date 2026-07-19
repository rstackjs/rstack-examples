import ReactDOM from 'react-dom';
import './styles.scss';
import HelloWorld from './components/hello-world.jsx';

function App() {
  return (
    <div className="app">
      <HelloWorld />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
