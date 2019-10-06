import {
  getHeroesAsync,
  Hero,
  getHeroesPromise,
  getHeroesCallback,
} from './data';
import { createDiv } from './dom';

export function getHeroesComponentCallback(
  callback: (component: HTMLUListElement) => any,
) {
  getHeroesCallback(data => {
    const component = loadHeroes(data);
    callback(component);
  });
}
export function getHeroesComponentPromise() {
  return getHeroesPromise().then(h => loadHeroes(h));
}

export async function getHeroesComponentAsync() {
  const heroes = await getHeroesAsync();
  return loadHeroes(heroes);
}

function loadHeroes(heroes: Hero[]) {
  const list = document.createElement('ul');
  list.classList.add('list');
  heroes.forEach((hero: Hero) => {
    const li = document.createElement('li');
    const card = createHeroCard(hero);
    li.appendChild(card);
    list.appendChild(li);
  });
  return list;
}

function createHeroCard(hero: Hero) {
  const card = createDiv();
  card.classList.add('card');
  const cardContent = createDiv();
  cardContent.classList.add('card-content');
  card.appendChild(cardContent);
  const content = createDiv();
  content.classList.add('content');
  cardContent.appendChild(content);
  const name = createDiv();
  name.classList.add('name');
  name.innerText = hero.name;
  content.appendChild(name);
  const description = createDiv();
  description.classList.add('description');
  description.innerText = hero.description;
  content.appendChild(description);
  return card;
}
