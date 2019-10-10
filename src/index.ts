import './design/index.scss';

import { getHeroAsync, getOrdersAsync, Hero, getHeroTreePromise } from './lib';

enum Mode {
  callback,
  promise,
  async,
}

import {
  replaceHeroListComponent,
  showFetching,
  showMessage,
} from './heroes.component';

const mode: Mode = Mode.promise;

const searchEmailElement = document.getElementById(
  'search-email'
) as HTMLInputElement;
const button = document.querySelector('.search-button');
let refreshHandler: () => void;
const renderHeroes = async () => {
  showFetching();
  refreshHandler();
};
searchEmailElement.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.code === 'Enter') renderHeroes();
});
button.addEventListener('click', renderHeroes);

async function render() {
  switch (mode) {
    case Mode.callback:
      refreshHandler = refreshPageCallback;
      break;

    case Mode.promise:
      refreshHandler = refreshPagePromise;
      break;

    case Mode.async:
      refreshHandler = refreshPageAsync;
      break;
  }
  renderHeroes();
}

function refreshPageCallback() {
  // getHeroesComponentCallback(
  //   heroesComponent => {
  //     mainContent.appendChild(heroesComponent);
  //   },
  //   error => console.log(error)
  // );
}

function refreshPagePromise() {
  getHeroTreePromise(searchEmailElement.value)
    .then(hero => replaceHeroListComponent(hero))
    .catch(error => {
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
    // report to the user, a nice message
    console.log(error);
    showMessage(error);
  } finally {
    replaceHeroListComponent(hero);
  }
}

render();
