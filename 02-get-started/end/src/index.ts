import './design/index.scss';

import {
  cloneElementsFromTemplate,
  createDiv,
  Hero,
  getHeroAsync,
  setText,
  showFetching,
  showMessage,
} from './lib';

const searchEmailElement = document.getElementById(
  'search-email',
) as HTMLInputElement;
const button = document.querySelector('.search-button');
searchEmailElement.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.code === 'Enter') render();
});
button.addEventListener('click', render);

async function render() {
  console.group('async demo');
  console.log('This');
  setTimeout(() => {
    console.log('is');
  }, 1000);
  console.log('Hello');
  setTimeout(() => {
    console.log('World');
  }, 1000);
  console.groupEnd();
}
