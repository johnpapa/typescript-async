import { Hero } from './data';
import { createDiv, setText, cloneElementsFromTemplate } from './dom';

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

function showFetching() {
  const heroPlaceholder = document.querySelector('.hero-list');
  const progressClone = cloneElementsFromTemplate('progress-template');
  heroPlaceholder.replaceWith(progressClone);
}

function replaceHeroListComponent(heroes?: Hero[]) {
  const heroPlaceholder = document.querySelector('.hero-list');
  const el = heroes && heroes.length ? createList() : createNoneFound();

  heroPlaceholder.replaceWith(el);

  function createList() {
    const ul = document.createElement('ul');
    ul.classList.add('list', 'hero-list');
    heroes.forEach((hero: Hero) =>
      ul.appendChild(createHeroCardFromTemplate(hero))
    );
    return ul;
  }

  function createNoneFound() {
    const div = createDiv('hero-list');
    div.innerText = 'No heroes found';
    return div;
  }
}

function showMessage(text: string, title = 'Info') {
  const msgElement = document.getElementById('message-box');
  msgElement.style.visibility = !!text ? 'visible' : 'hidden';
  msgElement.querySelector('.message-header').innerHTML = title;
  msgElement.querySelector('.message-body').innerHTML = text;
}

// code below here is not interesting

function createHeroCardFromTemplate(hero: Hero) {
  const heroClone = cloneElementsFromTemplate('hero-template');
  setText(heroClone, '.description', hero.description);
  setText(heroClone, '.name', hero.name);
  setText(heroClone, '.email', hero.email);
  heroClone.querySelector('.card').classList.add(hero.name);

  const button = heroClone.querySelector('.card-content button.expand-button');

  const ordersArea = heroClone.querySelector(
    `.card.${hero.name} .order-area`
  ) as HTMLElement;

  button.addEventListener('click', () => {
    // ordersArea.style.visibility = 'hidden';
    if (ordersArea) {
      ordersArea.style.display =
        ordersArea.style.display === 'none' ? 'block' : 'none';
    }
  });

  createHeroOrders(ordersArea, hero);

  return heroClone;
}

function createHeroOrders(ordersArea: HTMLElement, hero: Hero) {
  if (!hero.orders) {
    return;
  }

  hero.orders.forEach(order => {
    const orderClone = cloneElementsFromTemplate('order-template');
    const itemClones = createHeroOrderItems(order);
    itemClones.forEach(ic => orderClone.appendChild(ic));
    ordersArea.appendChild(orderClone);
  });
}

function createHeroOrderItems(order: {
  num: number;
  items: { name: string; qty: number; price: number }[];
}) {
  return order.items.map(item => {
    const itemClone = cloneElementsFromTemplate('order-item-template');
    setText(itemClone, '.order-number', order.num);
    setText(itemClone, '.item-name', item.name);
    setText(itemClone, '.item-qty', item.qty.toString());
    setText(itemClone, '.item-price', item.price.toString());
    return itemClone;
  });
}

export { replaceHeroListComponent, showFetching, showMessage };
