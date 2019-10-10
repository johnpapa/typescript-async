import {
  createDiv,
  setText,
  cloneElementsFromTemplate,
  Order,
  Hero,
} from './lib';

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
  const progressClone = cloneElementsFromTemplate('progress-template');
  const heroPlaceholder = document.querySelector('.hero-list');
  heroPlaceholder.replaceWith(progressClone);
}

function replaceHeroListComponent(hero?: Hero) {
  const heroPlaceholder = document.querySelector('.hero-list');
  const el = hero ? createList() : createNoneFound();

  heroPlaceholder.replaceWith(el);

  function createList() {
    const ul = document.createElement('ul');
    ul.classList.add('list', 'hero-list');
    // heroes.forEach((hero: Hero) =>
    ul.appendChild(createHeroCardFromTemplate(hero));
    // );
    return ul;
  }

  function createNoneFound() {
    const div = createDiv('hero-list');
    div.innerText = 'No heroes found';
    return div;
  }
}

function showMessage(text: string, title = 'Info') {
  const el = document.getElementById('message-box');
  el.style.visibility = !!text ? 'visible' : 'hidden';
  setText(el, '.message-header', title);
  setText(el, '.message-body', text);
}

// code below here is not interesting

function createHeroCardFromTemplate(hero: Hero) {
  const heroClone = cloneElementsFromTemplate('hero-template');
  setText(heroClone, '.description', hero.description);
  setText(heroClone, '.name', hero.name);
  setText(heroClone, '.email', hero.email);
  heroClone.querySelector('.card').classList.add(hero.name);

  const selector = `.card.${hero.name} .order-area`;
  const ordersArea = heroClone.querySelector(selector) as HTMLElement;

  const button = heroClone.querySelector('.card-content button.expand-button');
  button.addEventListener('click', () => {
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

function createHeroOrderItems(order: Order) {
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
