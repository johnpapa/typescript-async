import './design/index.scss';

import { getHeroTreePromise, Hero, showFetching, showMessage } from './lib';

import { replaceHeroListComponent } from './heroes.component';
import {
  getHeroesViaNewPromise,
  getHeroesViaPromise,
  getHeroesViaPromiseReject,
  getHeroesViaPromiseRejectShorter,
} from './examples/promise';

const searchEmailElement = document.getElementById(
  'search-email',
) as HTMLInputElement;
const button = document.querySelector('.search-button');
searchEmailElement.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.code === 'Enter') render();
});
button.addEventListener('click', render);

document
  .getElementById('resolved-promise')
  .addEventListener('click', resolvedPromise);

document
  .getElementById('resolved-using-promise-ctor')
  .addEventListener('click', resolvedUsingPromiseConstructor);

document
  .getElementById('rejected-promise')
  .addEventListener('click', rejectedPromise);

document
  .getElementById('rejected-promise-shorter')
  .addEventListener('click', rejectedPromiseShorter);

function wrapUp() {
  showFetching(false);
}

function handleErrors(error: any) {
  console.error('Oh no! rejected promise!');
  console.error(error);
  showMessage(`Something bad happened`, 'Error');
}

function showHeroes(heroes: Hero[]) {
  console.table(heroes);
  showMessage(`Returned ${heroes.length} heroes`);
  heroes.forEach(h => showMessage(JSON.stringify(h), 'heroes', true));
}

function resolvedPromise() {
  showFetching();
  showMessage();
  getHeroesViaPromise()
    .then(showHeroes)
    .catch(handleErrors)
    .finally(wrapUp);
}

function resolvedUsingPromiseConstructor() {
  showFetching();
  showMessage();
  getHeroesViaNewPromise()
    .then(showHeroes)
    .catch(handleErrors)
    .finally(wrapUp);
}

function rejectedPromise() {
  showFetching();
  showMessage();
  getHeroesViaPromiseReject()
    .then(showHeroes)
    .catch(handleErrors)
    .finally(wrapUp);
}

function rejectedPromiseShorter() {
  showFetching();
  showMessage();
  getHeroesViaPromiseRejectShorter()
    .then(showHeroes)
    .catch(handleErrors)
    .finally(wrapUp);
}

async function render() {
  showMessage();
  showFetching();
  getHeroTreePromise(searchEmailElement.value)
    .then((hero: Hero) => replaceHeroListComponent(hero))
    .catch((error: any) => {
      console.log(error);
      showMessage(error);
      replaceHeroListComponent();
    })
    .finally(wrapUp);
}
