import './design/index.scss';

import {
  dev,
  getHeroAsync,
  getOrdersAsync,
  getHeroTreePromise,
  getHeroesCallback,
  getOrdersCallback,
  Hero,
  showFetching,
  showMessage,
  getAccountRepAsync,
  getShippingStatusAsync,
  ShippingStatus,
  Order,
} from './lib';

enum Mode {
  callback = 'callback',
  promise = 'promise',
  async = 'async',
}

import { replaceHeroListComponent } from './heroes.component';

const asyncModeElement = document.getElementById(
  'async-mode',
) as HTMLSelectElement;
const errorModeElement = document.getElementById(
  'error-mode',
) as HTMLSelectElement;
const searchEmailElement = document.getElementById(
  'search-email',
) as HTMLInputElement;
const button = document.querySelector('.search-button');
searchEmailElement.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.code === 'Enter') render();
});
button.addEventListener('click', render);
errorModeElement.addEventListener('input', () => {
  switch (errorModeElement.value) {
    case '404':
      dev.breakAPI();
      break;

    case 'ok':
      dev.fixAPI();
      break;
  }
});

async function render() {
  let renderHeroes: () => void;
  showMessage();
  showFetching('.hero-list');
  const mode = asyncModeElement.value;
  switch (mode) {
    case Mode.callback:
      renderHeroes = refreshPageCallback;
      break;

    case Mode.promise:
      renderHeroes = refreshPagePromise;
      break;

    case Mode.async:
      renderHeroes = refreshPageAsync;
      break;
  }
  renderHeroes();
}

function refreshPageCallback() {
  getHeroesCallback(
    searchEmailElement.value,
    hero => {
      if (hero) {
        getOrdersCallback(
          hero.id,
          function(orders) {
            hero.orders = orders;
            replaceHeroListComponent(hero);
          },
          function(error) {
            console.log(error);
            showMessage(error);
            replaceHeroListComponent(hero);
          },
        );
      } else {
        replaceHeroListComponent(hero);
      }
    },
    error => {
      console.log(error);
      showMessage(error);
      replaceHeroListComponent();
    },
  );
}

function refreshPagePromise() {
  getHeroTreePromise(searchEmailElement.value)
    .then((hero: Hero) => replaceHeroListComponent(hero))
    .catch((error: any) => {
      console.log(error);
      showMessage(error);
      replaceHeroListComponent();
    });
}

async function refreshPageAsync() {
  let hero: Hero;
  try {
    // Level 1 - Get the hero record
    hero = await getHeroAsync(searchEmailElement.value);
    if (!hero) return;

    // Level 2 - Get the orders and account reps
    const [orders, accountRep] = await Promise.all([
      getOrdersAsync(hero.id),
      getAccountRepAsync(hero.id),
    ]);
    hero.orders = orders;
    hero.accountRep = accountRep;

    if (false) {
      // Level 3 - Get the shipping statuses
      // Now let's create an array of async functions to get the order statuses.
      // We'll call them and wait for all to return.
      const getStatusesAsync = orders.map(async (o: Order) =>
        getShippingStatusAsync(o.num),
      );
      const shippingStatuses = await Promise.all(getStatusesAsync);
      const sso = shippingStatuses.reduce((acc, ss) => {
        return { ...acc, [ss.orderNum]: ss };
      }, {} as ShippingStatus);
      hero.orders.forEach(o => {
        sso[o.num].status;
        o.shippingStatus = sso[o.num];
      });
    }
  } catch (error) {
    console.log(error);
    showMessage(error);
  } finally {
    replaceHeroListComponent(hero);
  }
}
