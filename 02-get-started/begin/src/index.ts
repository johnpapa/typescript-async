import './design/index.scss';
import { showMessage } from './lib';

document.querySelector('#bake-cookies').addEventListener('click', async () => {
  bake();
});

async function bake() {
  const title = 'Baking cookies';
  let counter = 0;
  console.clear();
  console.group(title);

  counter++;
  console.log(`${counter} - Add ingredients`);
  showMessage(`${counter} - Add ingredients`, title);

  counter++;
  console.log(`${counter} - Mix ingredients`);
  showMessage(`${counter} - Mix ingredients`, title, true);

  counter++;
  console.log(`${counter} - Bake at 325 degrees for 10 minutes`);
  showMessage(`${counter} - Bake at 325 degrees for 10 minutes`, title, true);

  counter++;
  console.log(`${counter} - Eat cookies`);
  showMessage(`${counter} - Eat cookies`, title, true);

  console.groupEnd();
}
