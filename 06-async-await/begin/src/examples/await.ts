import { heroes } from './heroes';
import { Hero } from '../lib';

const emptyHeroes: Hero[] = [];

/**
 * Return a fulfilled promise after a given delay.
 */
const delay = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));

/**
 * Get the heroes after a delay
 */
export async function getHeroesViaAsyncAwait() {
  await delay(1000);
  return await heroes;
}

/**
 * Get the heroes,
 * except this always causes an error
 */
export async function getHeroesAndThrow() {
  await delay(1000);
  const heroes = await emptyHeroes;
  if (!heroes || !heroes.length) {
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
    return await heroes;
  } catch (error) {
    console.error(error);
    throw Error('Uh oh! Errors!');
  }
}
