import axios, { AxiosResponse, AxiosError } from 'axios';

import { Order, Hero } from '../interfaces';
import { apiUrl } from './config';

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

const parseList = <T>(response: any) => {
  if (response.status !== 200) throw Error(response.message);
  if (!response.data) return [];
  let list: T[] = response.data;
  if (typeof list !== 'object') {
    list = [];
  }
  return list;
};

export { getHeroTreePromise };
