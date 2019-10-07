import {
  getHeroesAsync,
  getHeroesPromise,
  getHeroesCallback,
  Hero,
  Callback,
  CallbackError,
} from './data';

const getHeroesComponentCallback = function(
  callback: Callback<HTMLElement>,
  callbackError?: CallbackError
) {
  let heroes: Hero[] = [];
  getHeroesCallback(
    data => {
      heroes = data;
      const component = createHeroesComponent(heroes);
      callback(component);
    },
    msg => {
      const component = createHeroesComponent([]);
      callback(component);
      callbackError(msg);
    }
  );
};

const getHeroesComponentPromise = function() {
  let heroes: Hero[] = [];
  return getHeroesPromise()
    .then(data => {
      heroes = data;
      const ul = createHeroesComponent(heroes);
      return Promise.resolve(ul);
    })
    .catch(() => {
      const ul = createHeroesComponent(heroes);
      return Promise.resolve(ul);
    });
};

const getHeroesComponentAsync = async function() {
  let heroes: Hero[] = [];
  try {
    heroes = await getHeroesAsync();
  } finally {
    return createHeroesComponent(heroes);
  }
};

function createHeroHeader() {
  const header = createDiv();
  header.classList.add('content-title-group');
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

  button.addEventListener('click', async () => {
    let heroList = document.getElementById('hero-list');
    heroList && heroList.remove();
    const heroes = await getHeroesAsync();
    heroList = createHeroList(heroes);
    const wrapper = document.querySelector('.hero-list-wrapper');
    wrapper.appendChild(heroList);
  });

  return button;
}

function createHeroesComponent(heroes: Hero[]) {
  const wrapper = createDiv();
  wrapper.classList.add('hero-list-wrapper');
  wrapper.appendChild(createHeroHeader());
  const heroList = createHeroList(heroes);
  wrapper.appendChild(heroList);
  return wrapper;
}

function createHeroList(heroes: Hero[]): HTMLElement {
  if (!heroes.length) {
    const div = createDiv();
    div.id = 'hero-list';
    div.innerText = 'No heroes found';
    return div;
  }

  const ul = document.createElement('ul');
  ul.id = 'hero-list';
  ul.classList.add('list', 'hero-list');
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

const createDiv = () => document.createElement('div');

export {
  getHeroesComponentAsync,
  getHeroesComponentPromise,
  getHeroesComponentCallback,
};
