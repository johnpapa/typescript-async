import { Hero } from './data';

// function getHeroesComponentCallback(
//   // happy path to work
//   // on error rethrow
//   // always create component tho

//   // const getHeroesComponentCallback = function(
//   // ,
//   callback: Callback<HTMLElement>,
//   callbackError?: CallbackError
// ) {
//   let heroes: Hero[] = [];
//   getHeroesCallback(
//     data => {
//       heroes = data;
//       const component = createHeroesComponent(); //heroes);
//       callback(component);
//     },
//     msg => {
//       const component = createHeroesComponent(); //heroes);
//       callback(component);
//       callbackError(msg);
//     }
//   );
// }

// const getHeroesComponentPromise = function() {
//   let heroes: Hero[] = [];
//   return getHeroesPromise()
//     .then(data => {
//       heroes = data;
//       const ul = createHeroesComponent(); //heroes);
//       return ul;
//     })
//     .catch(() => {
//       const ul = createHeroesComponent(); //heroes);
//       // return Promise.reject();
//       return Promise.resolve(ul);
//     });
//   // .finally(() => {
//   //   // promise finally does not return
//   //   // const ul = createHeroesComponent(heroes);
//   //   return undefined;
//   // });
// };

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

function createExpandButton(cardId: string) {
  const button = document.createElement('button');
  button.classList.add('button', 'expand-button');
  const icon = document.createElement('i');
  icon.classList.add('fas', 'fa-angle-double-down');
  button.appendChild(icon);
  button.addEventListener('click', () => {
    const ordersArea = document.querySelector(
      `.card.${cardId} .order-area`
    ) as HTMLElement;
    // ordersArea.style.visibility = 'hidden';
    ordersArea.style.display =
      ordersArea.style.display === 'none' ? 'block' : 'none';
  });
  return button;
}

function showFetching() {
  const heroPlaceholder = document.querySelector('.hero-list');
  // const el = createDiv('hero-list');
  const progress = document.createElement('progress');
  progress.classList.add('hero-list', 'progress', 'is-medium', 'is-info');
  progress.setAttribute('max', '100');
  // el.innerHTML = '<p>Fetching Heroes</p>';
  heroPlaceholder.replaceWith(progress);
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

function createHeroCard2(hero: Hero) {
  const card = createDiv('box');
  const content = createDiv('content');
  card.appendChild(content);
  const name = createDiv('name');
  name.innerText = hero.name;
  content.appendChild(name);
  const description = createDiv('description');
  description.innerText = hero.description;
  content.appendChild(description);
  return card;
}

function createHeroCard(hero: Hero) {
  const card = createDiv('card');
  card.classList.add(hero.name);
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

  // const span = document.createElement('span');
  // span.classList.add('icon', 'is-small');
  // const icon = document.createElement('i');
  // icon.classList.add('fas', 'fa-angle-double-down');
  // span.appendChild(icon);
  content.appendChild(createExpandButton(hero.name));

  createHeroOrders(content);

  return card;
}

function createHeroOrders(content: HTMLElement) {
  const orders = [
    {
      num: 71025,
      items: [
        { name: 'Firestick', qty: 1, price: 19.99 },
        { name: 'Chromecast', qty: 2, price: 24.99 },
      ],
    },
    {
      num: 71880,
      items: [{ name: 'Apple TV', qty: 1, price: 104.99 }],
    },
  ];

  const ordersArea = createDiv('order-area');
  content.appendChild(ordersArea);

  orders.forEach(order => {
    const orderTemplate = document.getElementById(
      'order-template'
    ) as HTMLTemplateElement;
    const orderClone = document.importNode(orderTemplate.content, true);
    const itemClones = createHeroOrderItems(order); //, orderTemplate);

    itemClones.forEach(ic => orderClone.appendChild(ic));

    ordersArea.appendChild(orderClone);
  });
}
function createHeroOrderItems(
  order: {
    num: number;
    items: { name: string; qty: number; price: number }[];
  }
  // orderTemplate: HTMLTemplateElement,
) {
  return order.items.map(item => {
    const orderItemTemplate = document.getElementById(
      'order-item-template'
    ) as HTMLTemplateElement;
    // const oi = orderItemTemplate.content;
    const itemClone = document.importNode(orderItemTemplate.content, true);
    itemClone.querySelector('.order-number').textContent = `${order.num}`;
    itemClone.querySelector('.item-name').textContent = item.name;
    itemClone.querySelector('.item-qty').textContent = item.qty.toString();
    itemClone.querySelector('.item-price').textContent = item.price.toString();
    return itemClone;
  });
}

const createDiv = (...classList: string[]) => {
  const el = document.createElement('div');
  el.classList.add(...classList);
  return el;
};

export { createHeroesComponent, replaceHeroListComponent, showFetching };
