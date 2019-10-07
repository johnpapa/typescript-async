import './design/index.scss';

enum Mode {
  callback,
  promise,
  async,
}

import {
  getHeroesComponentAsync,
  getHeroesComponentPromise,
  getHeroesComponentCallback,
} from './heroes.component';

const mode: Mode = Mode.async;

async function render() {
  const mainContent = document.querySelector('.main-content');

  switch (mode) {
    case Mode.callback:
      getHeroesComponentCallback(
        heroesComponent => {
          mainContent.appendChild(heroesComponent);
        },
        error => console.log(error)
      );
      break;

    case Mode.promise:
      getHeroesComponentPromise()
        .then(heroesComponent => {
          mainContent.appendChild(heroesComponent);
        })
        .catch(error => console.log(error));
      break;

    case Mode.async:
      try {
        const heroesComponent = await getHeroesComponentAsync();
        mainContent.appendChild(heroesComponent);
      } catch (error) {
        console.log(error);
      }
      break;
  }
}

render();
