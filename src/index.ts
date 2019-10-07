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
import { createDiv } from './dom';

let mode = Mode.callback;

async function render() {
  const mainContent = document.querySelector('.main-content');
  // const element = createDiv();

  switch (mode) {
    case Mode.callback:
      // Callback
      getHeroesComponentCallback(heroesComponent => {
        mainContent.appendChild(heroesComponent);
      });
      break;

    case Mode.promise:
      // Promise
      getHeroesComponentPromise()
        .then(heroesComponent => {
          mainContent.appendChild(heroesComponent);
        })
        .catch(error => alert(error));
      break;

    case Mode.async:
      // Async
      const heroesComponent = await getHeroesComponentAsync();
      mainContent.appendChild(heroesComponent);
      break;
  }
}

render();
