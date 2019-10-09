import './design/index.scss';

declare global {
  interface Window {
    doShit: () => void;
  }
}

import { getHeroesAsync, getHeroesPromise, Hero } from './data';

enum Mode {
  callback,
  promise,
  async,
}

import {
  replaceHeroListComponent,
  createHeroesComponent,
  showFetching,
} from './heroes.component';

const mode: Mode = Mode.async;

async function render() {
  const mainContent = document.querySelector('.main-content');
  // Create heroes component with placeholder for the list
  const heroesComponent = createHeroesComponent();
  mainContent.appendChild(heroesComponent);

  let refreshHandler: () => void;

  const button = document.querySelector('.refresh-button');
  const renderHeroes = async () => {
    showFetching();
    refreshHandler();
  };
  button.addEventListener('click', renderHeroes);

  switch (mode) {
    case Mode.callback:
      refreshHandler = refreshPageCallback;
      break;

    case Mode.promise:
      refreshHandler = refreshPagePromise;
      break;

    case Mode.async:
      refreshHandler = refreshPageAsync;
      break;
  }
  renderHeroes();
}

function refreshPageCallback() {
  // getHeroesComponentCallback(
  //   heroesComponent => {
  //     mainContent.appendChild(heroesComponent);
  //   },
  //   error => console.log(error)
  // );
}

function refreshPagePromise() {
  getHeroesPromise()
    .then(heroes => replaceHeroListComponent(heroes))
    .catch(error => {
      replaceHeroListComponent();
      console.log(error);
    });
}

async function refreshPageAsync() {
  let heroes: Hero[];
  try {
    // component knows how to get its own data.
    // const heroesComponent = await getHeroesComponentAsync();
    // mainContent.appendChild(heroesComponent);

    heroes = await getHeroesAsync();

    // div.innerText = ''
    // get data
    // if data, then create compo(data)
  } catch (error) {
    console.log(error);
    // div.innerText = 'shit happened'
  } finally {
    replaceHeroListComponent(heroes);
  }
}

render();
