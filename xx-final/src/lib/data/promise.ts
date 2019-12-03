import axios, { AxiosResponse, AxiosError } from 'axios';

import { Order, Hero, AccountRepresentative } from '../interfaces';
import { apiUrl, parseList } from './config';

const getHeroTreePromise = function(searchEmail: string) {
  let hero: Hero;

  // Level 1 - Get the hero record
  return (
    getHeroPromise(searchEmail)
      // Level 2 - Set the hero, and pass it on
      .then((h: Hero) => {
        hero = h;
        return h;
      })
      // Level 3 - Get the orders and account reps
      .then((hero: Hero) => Promise.all([getOrders(hero), getAccountRep(hero)]))
      // Extract the orders and account reps and put them on their respective Hero objects
      .then((result: [Order[], AccountRepresentative]) => mergeData(result))
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
    if (accountRep) {
      hero.accountRep = accountRep;
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
    .then((response: AxiosResponse<Hero[]>) => {
      const data = parseList<Hero>(response);
      const hero = data[0];
      return hero;
      // no need to resolve as it is the default behavior
      // return Promise.resolve(hero);
    })
    .catch((error: AxiosError) => handleAxiosErrors(error, 'Hero'));
};

const getOrdersPromise = function(heroId: number) {
  const url = `${apiUrl}/orders/${heroId}`;
  return axios
    .get(url)
    .then((response: AxiosResponse<Order[]>) => parseList<Order>(response))
    .catch((error: AxiosError) => handleAxiosErrors(error, 'Orders'));
};

const getAccountRepPromise = function(heroId: number) {
  const url = `${apiUrl}/accountreps/${heroId}`;
  return axios
    .get(url)
    .then((response: AxiosResponse<AccountRepresentative>) => {
      const list = parseList<AccountRepresentative>(response);
      return list[0];
    })
    .catch((error: AxiosError) => handleAxiosErrors(error, 'Account Rep'));
};

function handleAxiosErrors(error: AxiosError, model: string) {
  console.error(`Developer Error: Async Data Error: ${error.message}`);
  return Promise.reject(`Oh no! We're unable to fetch the ${model}`);

  /**
   * Option - you could throw an error,
   *
   * but it won't be caught if you are inside
   * of another async callback.
   * So it is safer to reject.
   * throw new Error('User Facing Error: Something bad happened');
   */
}

export { getHeroTreePromise };
