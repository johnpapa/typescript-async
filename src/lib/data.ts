import axios, { AxiosResponse, AxiosError } from 'axios';

import { API } from './config';
import { Order, Callback, CallbackError, Hero } from './interfaces';

let apiUrl = API;

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
    throw new Error('User Facing Error: Something bad happened');

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
    throw new Error('User Facing Error: Something bad happened');
  }
};

const getHeroTreePromise = function(searchEmail: string) {
  let hero: Hero;

  return getHeroPromise(searchEmail)
    .then(getOrders)
    .then(mergeData);

  function getOrders(h: Hero): Promise<Order[]> {
    hero = h;
    return h ? getOrdersPromise(h.id) : undefined;
  }

  function mergeData(orders: Order[]): Hero {
    if (orders) {
      hero.orders = orders;
    }
    return hero;
  }
};

// PROMISE NESTING
// const getHeroTreePromise = function(searchEmail: string) {
//   let hero: Hero;
//   return getHeroPromise(searchEmail).then(h => {
//     hero = h;
//     return getOrdersPromise(h ? h.id : undefined).then(orders => {
//       if (orders) {
//         hero.orders = orders;
//       }
//       return hero;
//     });
//   });
// };

const getHeroPromise = (email: string) => {
  return axios
    .get<Hero[]>(`${apiUrl}/heroes?email=${email}`)
    .then((response: AxiosResponse<any>) => {
      const data = parseList<Hero>(response);
      const hero = data[0];
      return hero;
      // return Promise.resolve(hero);
    })
    .catch((error: AxiosError) => {
      console.error(`Developer Error: Async Data Error: ${error.message}`);
      // throw new Error('User Facing Error: Something bad happened');
      return Promise.reject('User Facing Error: Something bad happened');
    });
};

const getOrdersPromise = function(heroId: number) {
  const url = heroId ? `${apiUrl}/orders/${heroId}` : `${apiUrl}/orders`;
  return axios
    .get(url)
    .then((response: AxiosResponse<any>) => parseList<Order>(response))
    .catch((error: AxiosError) => {
      console.error(`Developer Error: Async Data Error: ${error.message}`);
      // throw new Error('User Facing Error: Something bad happened');
      return Promise.reject('User Facing Error: Something bad happened');
    });
};

const getHeroesCallback = function(
  email: string,
  callback: Callback<Hero>,
  callbackError?: CallbackError
) {
  axios
    .get<Hero[]>(`${apiUrl}/heroes?email=${email}`)
    .then((response: AxiosResponse<any>) => {
      const data = parseList<Hero>(response);
      const hero = data[0];
      callback(hero);
    })
    .catch((error: AxiosError) => {
      console.error(`Developer Error: Async Data Error: ${error.message}`);
      callbackError('User Facing Error: Something bad happened');
    });
};

const getOrdersCallback = function(
  heroId: number,
  callback: Callback<Order[]>,
  callbackError?: CallbackError
) {
  const url = heroId ? `${apiUrl}/orders/${heroId}` : `${apiUrl}/orders`;
  axios
    .get(url)
    .then((response: AxiosResponse<any>) => {
      const orders = parseList<Order>(response);
      callback(orders);
    })
    .catch((error: AxiosError) => {
      console.error(`Developer Error: Async Data Error: ${error.message}`);
      callbackError('User Facing Error: Something bad happened');
    });
};

const parseList = <T>(response: any) => {
  if (response.status !== 200) throw Error(response.message);
  if (!response.data) return [];
  let list: T[] = response.data;
  if (typeof list !== 'object') {
    list = [];
  }
  return list;
};

const delay = (ms: any) => new Promise(res => setTimeout(res, ms));
const getHeroesDelayedAsync = async function() {
  await delay(1250);
  return await [
    {
      id: 10,
      name: 'Madelyn',
      description: 'the cat whisperer',
    },
    {
      id: 20,
      name: 'Haley',
      description: 'pen wielder',
    },
    {
      id: 30,
      name: 'Ella',
      description: 'fashionista',
    },
    {
      id: 40,
      name: 'Landon',
      description: 'arc trooper',
    },
  ];
};

const dev = {
  breakAPI() {
    apiUrl = '/badapiurl';
  },
  fixAPI() {
    apiUrl = API;
  },
};

export {
  getHeroesDelayedAsync,
  getHeroAsync,
  getOrdersAsync,
  getHeroTreePromise,
  getHeroesCallback,
  getOrdersCallback,
  dev,
};
