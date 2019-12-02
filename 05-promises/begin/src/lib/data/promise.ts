import axios, { AxiosResponse, AxiosError } from 'axios';

import { Order, Hero, AccountRepresentative } from '../interfaces';
import { apiUrl, parseList } from './config';

/**
 * Get the hero and his/her related orders and account rep
 * using promises
 */
const getHeroTreePromise = function(searchEmail: string) {
  // TODO
};

/**
 * Get the hero
 */
const getHeroPromise = (email: string) => {
  // TODO
};

/**
 * Get the hero's orders
 */
const getOrdersPromise = function(heroId: number) {
  // TODO
};

/**
 * Get the hero's account rep
 */
const getAccountRepPromise = function(heroId: number) {
  // TODO
};

export { getHeroTreePromise };
