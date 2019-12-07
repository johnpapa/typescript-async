import { heroes } from './heroes';
import { Hero } from '../lib';

/**
 * Return a fulfilled promise after a given delay.
 */
const delay = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));

/**
 * Return a fulfilled promise of heroes
 */
const getHeroesDelayedAsync = async () => await heroes;

/**
 * Return a fulfilled promise of empty array
 */
const getHeroesEmpty: () => Promise<Hero[]> = async () => await [];

/**
 * Get the heroes after a delay
 */
export async function getHeroesViaAsyncAwait() {
  await delay(1000);
  return await getHeroesDelayedAsync();
}

/**
 * Get the heroes,
 * except this always causes an error
 */
export async function getHeroesAndThrow() {
  await delay(1000);
  const heroes = await getHeroesEmpty();
  if (!heroes ?? !heroes.length) {
    throw Error('Uh oh! Errors!');
  }
  return heroes;
}

/**
 * Get the heroes, but wrap with a try/catch
 */
export async function getHeroesAndTryCatch() {
  try {
    await delay(1000);
    return await getHeroesDelayedAsync();
  } catch (error) {
    console.error(error);
    throw Error('Uh oh! Errors!');
  }
}
