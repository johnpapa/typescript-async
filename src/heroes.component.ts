import {
  getHeroesAsync,
  getHeroesPromise,
  getHeroesCallback,
  Hero,
  Callback,
  CallbackError,
} from './data';
import { createDiv } from './dom';

const getHeroesComponentCallback = function(
  callback: Callback<HTMLUListElement>,
  callbackError?: CallbackError,
) {
  getHeroesCallback(
    data => {
      const component = createHeroesComponent(data);
      callback(component);
    },
    msg => {
      callbackError(msg);
    },
  );
};

const getHeroesComponentPromise = function() {
  return getHeroesPromise().then(h => {
    const ul = createHeroesComponent(h);
    return Promise.resolve(ul);
  });
  // .catch(error => {
  //   return Promise.reject([]);
  // });
};

const getHeroesComponentAsync = async function() {
  // try {
  const heroes = await getHeroesAsync();
  return createHeroesComponent(heroes);
  // } catch (error) {
  //   alert(error);
  // }
};

function createHeroesComponent(heroes: Hero[]) {
  const ul = document.createElement('ul');
  ul.classList.add('list');
  heroes.forEach((hero: Hero) => {
    const li = document.createElement('li');
    const card = createHeroCard(hero);
    li.appendChild(card);
    ul.appendChild(li);
  });
  return ul;
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

export {
  getHeroesComponentAsync,
  getHeroesComponentPromise,
  getHeroesComponentCallback,
};
