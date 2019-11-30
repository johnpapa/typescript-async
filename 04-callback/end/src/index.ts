import './design/index.scss';

import {
  cloneElementsFromTemplate,
  createDiv,
  Hero,
  setText,
  showFetching,
  showMessage,
  getHeroTreeCallback,
} from './lib';
import { getDataAfterDelay } from './examples/sync-and-async';
import { replaceHeroListComponent } from './heroes.component';

const searchEmailElement = document.getElementById(
  'search-email',
) as HTMLInputElement;
const button = document.querySelector('.search-button');
searchEmailElement.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.code === 'Enter') render();
});
button.addEventListener('click', render);

/**
 * Show Ingredients
 *
 * Concepts:
 *   Call a callback function.
 *   Create a callback function.
 */
document
  .querySelector('#show-ingredients')
  .addEventListener('click', getIngredients);

function getIngredients() {
  showMessage('Ingredients for baking amazing cookies:', 'Ingredients');
  getDataAfterDelay(1500, showIngredients);

  function showIngredients(ingredients: string[]) {
    ingredients.forEach(i => showMessage(`  ${i}`, 'Ingredients', true));
  }
}

/**
 * Render the heroes list.
 */
async function render() {
  showMessage();
  showFetching('.hero-list');
  getHeroTreeCallback(
    searchEmailElement.value,

    (hero: Hero) => {
      replaceHeroListComponent(hero);
    },

    (errorMsg: string) => {
      console.log(errorMsg);
      showMessage(errorMsg);
      replaceHeroListComponent();
    },
  );
}
