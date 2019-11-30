import './design/index.scss';

import {
  Hero,
  getHeroAsync,
  openModal,
  sayHelloTimer,
  showFetching,
  showMessage,
} from './lib';
import { replaceHeroListComponent } from './heroes.component';

const searchEmailElement = document.getElementById(
  'search-email',
) as HTMLInputElement;
const button = document.querySelector('.search-button');
searchEmailElement.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.code === 'Enter') render();
});
button.addEventListener('click', render);

document.querySelector('#open-modal').addEventListener('click', async () => {
  openModal().then((response: string) => {
    const msg =
      response === 'yes'
        ? `Yay! This is fun! 😄`
        : `Aw, that is sad. Let's try harder to have fun 😞`;

    showMessage(msg, 'Response from Modal');
  });
});

document.querySelector('#run-timer').addEventListener('click', async () => {
  sayHelloTimer(1000);
});

async function render() {
  showMessage();
  showFetching('.hero-list');
  let hero: Hero;
  try {
    hero = await getHeroAsync(searchEmailElement.value);
  } catch (error) {
    console.log(error);
    showMessage(error);
  } finally {
    replaceHeroListComponent(hero);
  }
}
