import { Hero, createDiv, cloneElementsFromTemplate, setText } from './lib';

export function replaceHeroListComponent(hero?: Hero) {
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
 **/

function createHeroCardFromTemplate(hero: Hero) {
  const heroClone = cloneElementsFromTemplate('hero-template');
  setText(heroClone, '.description', hero.description);
  setText(heroClone, '.name', hero.name);
  setText(heroClone, '.email', hero.email);
  heroClone.querySelector('.card').classList.add(hero.name);
  return heroClone;
}
