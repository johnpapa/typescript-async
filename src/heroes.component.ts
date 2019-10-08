import {
  getHeroesAsync,
  getHeroesPromise,
  getHeroesCallback,
  Hero,
  Callback,
  CallbackError,
} from './data';

function getHeroesComponentCallback(
  // happy path to work
  // on error rethrow
  // always create component tho

  // const getHeroesComponentCallback = function(
  // ,
  callback: Callback<HTMLElement>,
  callbackError?: CallbackError
) {
  let heroes: Hero[] = [];
  getHeroesCallback(
    data => {
      heroes = data;
      const component = createHeroesComponent(); //heroes);
      callback(component);
    },
    msg => {
      const component = createHeroesComponent(); //heroes);
      callback(component);
      callbackError(msg);
    }
  );
}

const getHeroesComponentPromise = function() {
  let heroes: Hero[] = [];
  return getHeroesPromise()
    .then(data => {
      heroes = data;
      const ul = createHeroesComponent(); //heroes);
      return ul;
    })
    .catch(() => {
      const ul = createHeroesComponent(); //heroes);
      // return Promise.reject();
      return Promise.resolve(ul);
    });
  // .finally(() => {
  //   // promise finally does not return
  //   // const ul = createHeroesComponent(heroes);
  //   return undefined;
  // });
};

// function createHeroesComponent(heroes: Hero[]) {
function createHeroesComponent() {
  const wrapper = createDiv('hero-list-wrapper');
  wrapper.appendChild(createHeroHeaderComponent());
  wrapper.appendChild(createDiv('hero-list'));
  // createHeroList(heroes);
  return wrapper;
}

// code below here is not interesting

function createHeroHeaderComponent() {
  const header = createDiv('content-title-group');
  const h2 = document.createElement('h2');

  h2.classList.add('title');
  h2.innerText = 'Heroes';
  header.appendChild(h2);
  const refreshButton = createRefreshButton();
  header.appendChild(refreshButton);

  return header;
}

function createRefreshButton() {
  const button = document.createElement('button');
  button.classList.add('button', 'refresh-button');
  const icon = document.createElement('i');
  icon.classList.add('fas', 'fa-sync');
  button.appendChild(icon);
  return button;
}

function replaceHeroListComponent(heroes?: Hero[]) {
  const heroPlaceholder = document.querySelector('.hero-list');

  const el = heroes && heroes.length ? createList() : createNoneFound();

  heroPlaceholder.replaceWith(el);

  function createList() {
    const ul = document.createElement('ul');
    ul.classList.add('list', 'hero-list');
    heroes.forEach((hero: Hero) => {
      const li = document.createElement('li');
      const card = createHeroCard(hero);
      li.appendChild(card);
      ul.appendChild(li);
    });
    return ul;
  }

  function createNoneFound() {
    const div = createDiv('hero-list');
    div.innerText = 'No heroes found';
    return div;
  }
}

function createHeroCard(hero: Hero) {
  const card = createDiv('card');
  const cardContent = createDiv('card-content');
  card.appendChild(cardContent);
  const content = createDiv('content');
  cardContent.appendChild(content);
  const name = createDiv('name');
  name.innerText = hero.name;
  content.appendChild(name);
  const description = createDiv('description');
  description.innerText = hero.description;
  content.appendChild(description);
  return card;
}

const createDiv = (...classList: string[]) => {
  const el = document.createElement('div');
  el.classList.add(...classList);
  return el;
};

export {
  createHeroHeaderComponent,
  replaceHeroListComponent,
  createHeroesComponent
};
