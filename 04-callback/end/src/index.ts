import './design/index.scss';

import {
  cloneElementsFromTemplate,
  createDiv,
  Hero,
  getHeroAsync,
  setText,
  showFetching,
  showMessage,
} from './lib';

const searchEmailElement = document.getElementById(
  'search-email',
) as HTMLInputElement;
const button = document.querySelector('.search-button');
searchEmailElement.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.code === 'Enter') render();
});
button.addEventListener('click', render);

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

function replaceHeroListComponent(hero?: Hero) {
  const heroPlaceholder = document.querySelector('.hero-list');
  const el = hero ? createList() : createNoneFound();

  heroPlaceholder.replaceWith(el);

  function createList() {
    const ul = document.createElement('ul');
    ul.classList.add('list', 'hero-list');
    ul.appendChild(createHeroCardFromTemplate(hero));
    return ul;
  }

  function createNoneFound() {
    const div = createDiv('hero-list');
    div.innerText = 'No heroes found';
    return div;
  }
}

/**
 * Code below here are private functions to this module
 * that support the replaceHeroListComponent function.
 */

function createHeroCardFromTemplate(hero: Hero) {
  const heroClone = cloneElementsFromTemplate('hero-template');
  setText(heroClone, '.description', hero.description);
  setText(heroClone, '.name', hero.name);
  setText(heroClone, '.email', hero.email);
  heroClone.querySelector('.card').classList.add(hero.name);
  return heroClone;
}
