import './design/index.scss';

import { getHeroesAsync, getHeroesPromise, Hero, getOrdersAsync } from './data';

enum Mode {
  callback,
  promise,
  async,
}

import {
  replaceHeroListComponent,
  createHeroesComponent,
  showFetching,
  showMessage,
} from './heroes.component';

const mode: Mode = Mode.async;

async function render() {
  const mainContent = document.querySelector('.main-content');
  // Create heroes component with placeholder for the list
  const heroesComponent = createHeroesComponent();
  mainContent.appendChild(heroesComponent);

  let refreshHandler: () => void;

  const button = document.querySelector('.search-button');
  const renderHeroes = async () => {
    showFetching();
    refreshHandler();
  };
  button.addEventListener('click', renderHeroes);

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
  getHeroesPromise()
    .then(heroes => replaceHeroListComponent(heroes))
    .catch(error => {
      replaceHeroListComponent();
      console.log(error);
    });
}

async function refreshPageAsync() {
  let heroes: Hero[];
  try {
    // component knows how to get its own data.
    // const heroesComponent = await getHeroesComponentAsync();
    // mainContent.appendChild(heroesComponent);

    heroes = await getHeroesAsync();

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

    for (const hero of heroes) {
      hero.orders = await getOrdersAsync(hero.id);
    }

    // div.innerText = ''
    // get data
    // if data, then create compo(data)
  } catch (error) {
    // report to the user, a nice message
    console.log(error);
    showMessage(error);
    // div.innerText = 'sumtin happened'
  } finally {
    replaceHeroListComponent(heroes);
  }
}

render();
