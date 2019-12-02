import { heroes } from './heroes';
import { Hero } from '../lib';

/**
 * Return a fulfilled promise after a given delay.
 */
const delay = (ms: any) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));

/**
 * Return a fulfilled promise of heroes
 */
const getHeroesDelayedAsync = () =>
  new Promise<Hero[]>(resolve => resolve(heroes));

/**
 * Return a fulfilled promise of empty array
 */
const getHeroesEmpty = () => Promise.resolve([]);

/**
 * Get the heroes via a Promise
 */
export const getHeroesViaPromise = function() {
  return delay(1000).then(() => getHeroesDelayedAsync());
};

/**
 * Create and return a promise.
 * When invoked, it will settle
 * by either resolve or reject.
 */
export function getHeroesViaNewPromise() {
  const newPromise = new Promise<Hero[]>((resolve, reject) => {
    return delay(1000)
      .then(() => getHeroesDelayedAsync())
      .then((heroes: Hero[]) => {
        if (heroes && heroes.length) {
          resolve(heroes);
        } else {
          reject(Error('Uh oh! Errors!'));
        }
      });
  });
  return newPromise;
}

/**
 * Get the heroes,
 * except this always causes a Promise reject
 */
export const getHeroesViaPromiseReject = function() {
  const newPromise = new Promise<Hero[]>((resolve, reject) => {
    return delay(1000)
      .then(() => getHeroesEmpty())
      .then((heroes: Hero[]) => {
        if (heroes && heroes.length) {
          resolve(heroes);
        } else {
          reject(Error('Uh oh! Errors!'));
        }
      });
  });
  return newPromise;
};

export const getHeroesViaPromiseRejectShorter = function() {
  const getHeroesDelayedAsync = () =>
    Promise.reject('bad error occured getting the heroes');
  return delay(1000).then(() => getHeroesDelayedAsync());
};

// function example() {
//   showFetching(true);

//   return getHeroes()
//     .then((hero: Hero) => replaceHeroListComponent(hero))
//     .catch((error: any) => {
//       showMessage(error);
//     })
//     .finally(() => {
//       showFetching(false);
//     });
// }
