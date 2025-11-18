import { render } from 'solid-js/web';
import App from './App';
import './index.css';

const root = document.getElementById('root');

if (root) { // Good practice to check if root exists
  render(() => <App />, root);
} else {
  console.error("Root element #root not found in the HTML.");
}