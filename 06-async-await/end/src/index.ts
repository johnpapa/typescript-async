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

document
  .getElementById('async-try')
  .addEventListener('click', renderHeroesAndTryCatch);

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
  try {
    const heroes = await getHeroesViaAsyncAwait();
    showHeroes(heroes);
  } catch (error) {
    handleErrors(error);
  } finally {
    wrapUp();
  }
}

/**
 * Get the heroes, but an error is thrown!
 * Handle errors gracefully?
 * Always end by turning off progress indicator.
 */
async function renderHeroesButThrow() {
  showFetching();
  showMessage();
  try {
    const heroes = await getHeroesAndThrow();
    showHeroes(heroes);
  } catch (error) {
    handleErrors(error);
  } finally {
    wrapUp();
  }
}

async function render() {
  showMessage();
  showFetching();
  let hero: Hero;
  try {
    hero = await getHeroTreeAsync(searchEmailElement.value);
    replaceHeroListComponent(hero);
  } catch (error) {
    console.log(error);
    showMessage(error);
  } finally {
    wrapUp();
  }
}
