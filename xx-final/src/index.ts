import './design/index.scss';

import {
  dev,
  getHeroTreeCallback,
  getHeroTreePromise,
  getHeroTreeAsync,
  Hero,
  showFetching,
  showMessage,
} from './lib';

enum Mode {
  callback = 'callback',
  promise = 'promise',
  async = 'async',
}

import { replaceHeroListComponent } from './heroes.component';

const asyncModeElement = document.getElementById(
  'async-mode',
) as HTMLSelectElement;
const errorModeElement = document.getElementById(
  'error-mode',
) as HTMLSelectElement;
const searchEmailElement = document.getElementById(
  'search-email',
) as HTMLInputElement;
const button = document.querySelector('.search-button');
searchEmailElement.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.code === 'Enter') render();
});
button.addEventListener('click', render);
asyncModeElement.addEventListener('input', () => {
  replaceHeroListComponent();
});
errorModeElement.addEventListener('input', () => {
  replaceHeroListComponent();
  switch (errorModeElement.value) {
    case '404':
      dev.breakAPI();
      break;

    case 'ok':
      dev.fixAPI();
      break;
  }
});

async function render() {
  let renderHeroes: () => void;
  showMessage();
  showFetching('.hero-list');
  const mode = asyncModeElement.value;
  switch (mode) {
    case Mode.callback:
      renderHeroes = refreshPageCallback;
      break;

    case Mode.promise:
      renderHeroes = refreshPagePromise;
      break;

    case Mode.async:
      renderHeroes = refreshPageAsync;
      break;
  }
  renderHeroes();
}

function refreshPageCallback() {
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

function refreshPagePromise() {
  getHeroTreePromise(searchEmailElement.value)
    .then((hero: Hero) => replaceHeroListComponent(hero))
    .catch((error: any) => {
      console.log(error);
      showMessage(error);
      replaceHeroListComponent();
    });
}

async function refreshPageAsync() {
  let hero: Hero;
  try {
    hero = await getHeroTreeAsync(searchEmailElement.value);
  } catch (error) {
    console.log(error);
    showMessage(error);
  } finally {
    replaceHeroListComponent(hero);
  }
}
