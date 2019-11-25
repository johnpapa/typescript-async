import './design/index.scss';
import { showMessage } from './lib';

document.querySelector('#bake-cookies').addEventListener('click', async () => {
  bake();
});

async function bake() {
  console.clear();
  console.group('baking cookies');
  console.log('Add ingredients');
  showMessage('Add ingredients', 'Baking Cookies');
  console.log('Mix ingredients');
  showMessage('Mix ingredients', 'Baking Cookies', true);
  setTimeout(() => {
    console.log('Bake at 325 degrees for 10 minutes');
    showMessage('Bake at 325 degrees for 10 minutes', 'Baking Cookies', true);
  }, 1000);
  console.log('Eat cake');
  showMessage('Eat cake', 'Baking Cookies', true);
  console.groupEnd();
}
