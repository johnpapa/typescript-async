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

function resolvedPromise() {
  showFetching();
  showMessage();
  getHeroesViaPromise()
    .then(heroes => {
      console.log('get hero via promise');
      console.table(heroes);
      showMessage(`Returned ${heroes.length} heroes`);
    })
    .catch(error => {
      console.error('Oh no! rejected promise!');
      console.error(error);
    })
    .finally(() => showFetching(false));
}

function resolvedUsingPromiseConstructor() {
  showFetching();
  showMessage();
  getHeroesViaNewPromise()
    .then(heroes => {
      console.log('get new promise');
      console.table(heroes);
      showMessage(`Returned ${heroes.length} heroes`);
    })
    .finally(() => showFetching(false));
}

function rejectedPromise() {
  showFetching();
  showMessage();
  getHeroesViaPromiseReject()
    .then(heroes => {
      console.log('get hero via promise');
      console.table(heroes);
    })
    .catch(error => {
      console.error('Oh no! rejected promise!');
      console.error(error);
      showMessage(`Something bad happened`, 'Error');
    })
    .finally(() => showFetching(false));
}

function rejectedPromiseShorter() {
  showFetching();
  showMessage();
  getHeroesViaPromiseRejectShorter()
    .then(heroes => {
      console.log('get hero via promise');
      console.table(heroes);
    })
    .catch(error => {
      console.error('Oh no! rejected promise!');
      console.error(error);
      showMessage(`Something bad happened`, 'Error');
    })
    .finally(() => showFetching(false));
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
    .finally(() => {
      showFetching(false);
    });
}
