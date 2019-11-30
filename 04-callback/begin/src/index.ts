import './design/index.scss';

import { showFetching, showMessage } from './lib';
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

  // TODO: Get the ingredients and display them
}

/**
 * Render the heroes list.
 */
async function render() {
  showMessage();
  showFetching('.hero-list');

  /**
   * TODO:
   * Get the heroes.
   * If it works, display them.
   * If it fails, display an error.
   */
}
