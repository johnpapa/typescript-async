import { heroes } from './heroes';
import { Hero } from '../lib';

/**
 * Return a fulfilled promise after a given delay.
 */
const delay = (ms: number) =>
  new Promise<void>(resolve => setTimeout(resolve, ms));

/**
 * Get the heroes after a delay
 */
export async function getHeroesViaAsyncAwait() {
  // TODO - get heroes after a delay
}

/**
 * Get the heroes,
 * except this always causes an error
 * because it always is []
 */
export async function getHeroesAndThrow() {
  // TODO - get empty array heroes after a delay
}

/**
 * Get the heroes, but wrap with a try/catch
 */
export async function getHeroesAndTryCatch() {
  // TODO - get heroes after a delay, and use try/catch
}
