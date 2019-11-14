import axios, { AxiosResponse, AxiosError } from 'axios';

import { Order, Hero, AccountRepresentative } from '../interfaces';
import { apiUrl, parseList } from './config';

const getHeroTreePromise = function(searchEmail: string) {
  let hero: Hero;

  // Level 1 - Get the hero record
  return (
    getHeroPromise(searchEmail)
      // Level 2 - Get the orders and account reps
      .then((hero: Hero) => Promise.all([getOrders(hero), getAccountRep(hero)]))
      .then(result => mergeData(result))
  );

  function getOrders(h: Hero): Promise<Order[]> {
    hero = h;
    return h ? getOrdersPromise(h.id) : undefined;
  }

  function getAccountRep(h: Hero): Promise<AccountRepresentative> {
    hero = h;
    return h ? getAccountRepPromise(h.id) : undefined;
  }

  function mergeData(result: [Order[], AccountRepresentative]): Hero {
    const [orders, accountRep] = result;
    if (orders) {
      hero.orders = orders;
    }
    hero.accountRep = accountRep;
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
      // no need to resolve as it is the default behavior
      // return Promise.resolve(hero);
    })
    .catch((error: AxiosError) => {
      console.error(`Developer Error: Async Data Error: ${error.message}`);
      // Option - you can throw an error,
      // but it won't be caught if you are inside
      // of another async callback. So it is safer to reject.
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
      return Promise.reject('User Facing Error: Something bad happened');
    });
};

const getAccountRepPromise = function(heroId: number) {
  const url = `${apiUrl}/accountreps/${heroId}`;
  return axios
    .get(url)
    .then((response: AxiosResponse<any>) => {
      const list = parseList<AccountRepresentative>(response);
      return list[0];
    })
    .catch((error: AxiosError) => {
      console.error(`Developer Error: Async Data Error: ${error.message}`);
      return Promise.reject('User Facing Error: Something bad happened');
    });
};

export { getHeroTreePromise };
