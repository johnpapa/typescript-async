import axios, { AxiosError } from 'axios';

import { apiUrl, parseList } from './config';
import {
  Order,
  Hero,
  AccountRepresentative,
  ShippingStatus,
} from '../interfaces';

const getHeroAsync = async function(email: string) {
  // TODO
};

const getOrdersAsync = async function(heroId: number) {
  // TODO
};

const getAccountRepAsync = async function(heroId: number) {
  // TODO
};

const getShippingStatusAsync = async function(orderNumber: number) {
  // TODO
};

const getHeroTreeAsync = async function(email: string) {
  // TODO
};

function handleAxiosErrors(error: AxiosError, model: string) {
  /**
   * This is a technical error, targeting the developers.
   * You should always log it here (lowest level). This serves the developer.
   * If I want to propogate this back to the callers,
   * I should determine how to propogate it out and if I want to transform it.
   */
  console.error(`Developer Error: Async Data Error: ${error.message}`);

  /**
   *  How do I feel about errors in this path?
   * Log the error here,
   * and let the caller know an error occurred,
   * but dont change the return type
   */
  throw new Error(`Oh no! We're unable to fetch the ${model}`);

  /**
   * Throw errors or return them?
   *
   * We could pass this back every time.
   * the argument here is you can avoid try/catch everywhere but you instead have to package the error.
   * interface Message {
   *   response: any;
   *   error: string;
   * }
   *
   * return the error object to the caller, to be examined
   * return {response, error};
   */
}

export { getHeroTreeAsync };
