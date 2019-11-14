import axios from 'axios';

import { apiUrl, parseList } from './config';
import {
  Order,
  Hero,
  AccountRepresentative,
  ShippingStatus,
} from '../interfaces';

// we could pass this back every time.
// the argument here is you can avoid try/catch everywhere but you instead have to package the error.
// interface Message {
//   response: any;
//   error: string;
// }

// first show without any try/catch as we explain how errors bubble upo.
// then introduce try/catch to show how we can do other stuff
// const getHeroesAsync2 = async function() {
//   const response = await axios.get(`${apiUrl}/heroes`);
//   const data = parseList(response);
//   return data;
// };

const getHeroAsync = async function(email: string) {
  try {
    const response = await axios.get(`${apiUrl}/heroes?email=${email}`);
    const data = parseList<Hero>(response);
    const hero = data[0];
    return hero;
  } catch (error) {
    // This is a technical error, targeting the developers.
    // You should always log it here (lowest level). This serves the developer.
    // If I want to propogate this back to the callers,
    // I should determine how to propogate it out and if I want to transform it.
    console.error(`Developer Error: Async Data Error: ${error.message}`);

    // How do I feel about errors in this path?
    // option 1: log the error here,
    // and let the caller know an error occurred, but dont change the return type
    throw new Error(`Oh no! We're unable to fetch the Hero`);

    // option 2: log the error here,
    // return the error object to the caller
    // return {error: msg}; // return something
  }
};

const getOrdersAsync = async function(heroId: number) {
  try {
    const url = heroId ? `${apiUrl}/orders/${heroId}` : `${apiUrl}/orders`;
    const response = await axios.get(url);
    const data = parseList<Order>(response);
    return data;
  } catch (error) {
    console.error(`Developer Error: Async Data Error: ${error.message}`);
    throw new Error(`Oh no! We're unable to fetch the Orders`);
  }
};

const getAccountRepAsync = async function(heroId: number) {
  try {
    const url = `${apiUrl}/accountreps/${heroId}`;
    const response = await axios.get(url);
    const data = parseList<AccountRepresentative>(response);
    return data[0];
  } catch (error) {
    console.error(`Developer Error: Async Data Error: ${error.message}`);
    throw new Error(`Oh no! We're unable to fetch the Account Rep`);
  }
};

const getShippingStatusAsync = async function(orderNumber: number) {
  try {
    const url = `${apiUrl}/shippingstatuses/${orderNumber}`;
    const response = await axios.get(url);
    const data = parseList<ShippingStatus>(response);
    return data[0];
  } catch (error) {
    console.error(`Developer Error: Async Data Error: ${error.message}`);
    throw new Error(`Oh no! We're unable to fetch the Shipping Status`);
  }
};

const getHeroTreeAsync = async function(email: string) {
  // Level 1 - Get the hero record
  const hero = await getHeroAsync(email);
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
      return {
        ...acc,
        [ss.orderNum]: ss,
      };
    }, {} as ShippingStatus);
    hero.orders.forEach(o => {
      sso[o.num].status;
      o.shippingStatus = sso[o.num];
    });
  }
  return hero;
};

// const delay = (ms: any) => new Promise(res => setTimeout(res, ms));
// const getHeroesDelayedAsync = async function() {
//   await delay(1250);
//   return await [
//     {
//       id: 10,
//       name: 'Madelyn',
//       description: 'the cat whisperer',
//     },
//     {
//       id: 20,
//       name: 'Haley',
//       description: 'pen wielder',
//     },
//     {
//       id: 30,
//       name: 'Ella',
//       description: 'fashionista',
//     },
//     {
//       id: 40,
//       name: 'Landon',
//       description: 'arc trooper',
//     },
//   ];
// };

export { getHeroTreeAsync };
