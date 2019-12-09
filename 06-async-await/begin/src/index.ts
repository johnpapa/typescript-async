import './design/index.scss';

import { Hero, showFetching, showMessage } from './lib';

import { replaceHeroListComponent } from './heroes.component';
import {
  getHeroesViaAsyncAwait,
  getHeroesAndThrow,
  getHeroesAndTryCatch,
} from './examples/await';
import { getHeroTreeAsync } from './lib/data/await';

const searchEmailElement = document.getElementById(
  'search-email',
) as HTMLInputElement;
const button = document.querySelector('.search-button');
searchEmailElement.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.code === 'Enter') render();
});
button.addEventListener('click', render);

document
  .getElementById('async-heroes')
  .addEventListener('click', renderHeroesAsync);

document
  .getElementById('async-throw')
  .addEventListener('click', renderHeroesButThrow);

function wrapUp() {
  showFetching(false);
}

function handleErrors(error: any) {
  console.error('Oh no!');
  console.error(error);
  showMessage(`Something bad happened`, 'Error');
}

function showHeroes(heroes: Hero[]) {
  console.table(heroes);
  showMessage(`Returned ${heroes.length} heroes`);
  heroes.forEach(h => showMessage(JSON.stringify(h), 'heroes', true));
}

/**
 * Get the heroes, renders them.
 * Handle errors gracefully.
 * Always end by turning off progress indicator.
 */
async function renderHeroesAsync() {
  showFetching();
  showMessage();
  // TODO - getHeroesViaAsyncAwait
}

/**
 * Get the heroes, but an error is thrown!
 * Handle errors gracefully?
 * Always end by turning off progress indicator.
 */
async function renderHeroesButThrow() {
  showFetching();
  showMessage();
  // TODO - getHeroesAndThrow
}

async function render() {
  showMessage();
  showFetching();
  /**
   * Get all of the hero data.
   * Then show the hero with the hero component.
   * Handle any errors
   * Always turn off the fetching indicator.
   */
  // TODO
}
