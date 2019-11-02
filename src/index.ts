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
} from './lib';

enum Mode {
  callback = 'callback',
  promise = 'promise',
  async = 'async',
}

import { replaceHeroListComponent } from './heroes.component';

const asyncModeElement = document.getElementById(
  'async-mode'
) as HTMLSelectElement;
const errorModeElement = document.getElementById(
  'error-mode'
) as HTMLSelectElement;
const searchEmailElement = document.getElementById(
  'search-email'
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
          }
        );
      } else {
        replaceHeroListComponent(hero);
      }
    },
    error => {
      console.log(error);
      showMessage(error);
      replaceHeroListComponent();
    }
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
    hero = await getHeroAsync(searchEmailElement.value);
    if (!hero) return;
    // heroes = await getHeroesAsync();

    // guest = await getGuest('wes@gmail.com'); first call
    // hotel = await getHotel(guest.id); // 1 2nd call
    // bags = await getbags(guest.id); // 1 2nd call
    // friends = await getFriends(guest.id); // list 2nd call
    // friendIDs = collectFriendIds()
    // friendsBags = await getFriendsBags(friendIds); // list - 1 call, merge the results - 3rd call

    // customer = await getCustomer('haley@johnpapa.net'); // level 1 - why? maybe id is not on the page? its a search box? -> Craig
    // acctRep = await getAcctRep(customer.id); // level 2 - -> Heidi
    // orders = await getOrders(customer.id); // // level 2 - -> Craig's orders and details
    // orderIds = []; // collect the IDs
    // shippingStatuses = await orderShippingStatus(orderIds); // level 3 - -> [1: {orderId: 1, status: good}, 2: {orderId: 2, status: bad}]
    // Merge statuses into the data (customer.orders.forEach((o) => { o.status = statuses[o.id].status } ))

    // for (const hero of heroes) {
    //   hero.orders = await getOrdersAsync(hero.id);
    // }
    // if (heroes && heroes.length) {
    // const hero = heroes[0];
    hero.orders = await getOrdersAsync(hero.id);
    // }
  } catch (error) {
    console.log(error);
    showMessage(error);
  } finally {
    replaceHeroListComponent(hero);
  }
}
