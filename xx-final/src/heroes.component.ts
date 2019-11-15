import {
  createDiv,
  setText,
  cloneElementsFromTemplate,
  Order,
  Hero,
} from './lib';

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
  setText(heroClone, '.accountrep', hero.accountRep?.name);
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
    setText(orderClone, '.order-number', order.num.toString());
    setText(orderClone, '.status', order.shippingStatus?.status ?? 'n/a');
    const itemClones = createHeroOrderItems(order);
    itemClones.forEach(ic => orderClone.appendChild(ic));
    ordersArea.appendChild(orderClone);
  });
}

function createHeroOrderItems(order: Order) {
  return order.items.map(item => {
    const itemClone = cloneElementsFromTemplate('order-item-template');
    setText(itemClone, '.order-number', order.num.toString());
    setText(itemClone, '.item-name', item.name);
    setText(itemClone, '.item-qty', item.qty.toString());
    setText(itemClone, '.item-price', item.price.toString());
    return itemClone;
  });
}

export { replaceHeroListComponent };
