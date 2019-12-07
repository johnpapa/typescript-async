import axios, { AxiosError } from 'axios';

import { apiUrl, parseList } from './config';
import {
  Order,
  Hero,
  AccountRepresentative,
  ShippingStatus,
} from '../interfaces';

const getHeroAsync = async function(email: string) {
  try {
    const response = await axios.get(`${apiUrl}/heroes?email=${email}`);
    const data = parseList<Hero>(response);
    const hero = data[0];
    return hero;
  } catch (error) {
    handleAxiosErrors(error, 'Hero');
  }
};

const getOrdersAsync = async function(heroId: number) {
  try {
    const response = await axios.get(`${apiUrl}/orders/${heroId}`);
    const data = parseList<Order>(response);
    return data;
  } catch (error) {
    handleAxiosErrors(error, 'Orders');
  }
};

const getAccountRepAsync = async function(heroId: number) {
  try {
    const response = await axios.get(`${apiUrl}/accountreps/${heroId}`);
    const data = parseList<AccountRepresentative>(response);
    return data[0];
  } catch (error) {
    handleAxiosErrors(error, 'Account Rep');
  }
};

const getShippingStatusAsync = async function(orderNumber: number) {
  try {
    const response = await axios.get(
      `${apiUrl}/shippingstatuses/${orderNumber}`,
    );
    const data = parseList<ShippingStatus>(response);
    return data[0];
  } catch (error) {
    handleAxiosErrors(error, 'Shipping Status');
  }
};

const getHeroTreeAsync = async function(email: string) {
  /**
   * Level 1 - Get the hero record
   */
  const hero = await getHeroAsync(email);
  if (!hero) return;

  /**
   * Level 2 - Get the orders and account reps
   */
  const [orders, accountRep] = await Promise.all([
    getOrdersAsync(hero.id),
    getAccountRepAsync(hero.id),
  ]);
  hero.orders = orders;
  hero.accountRep = accountRep;

  /**
   * Level 3 - Get the shipping statuses
   * Let's create an array of async functions
   * to get the shipping statuses for each order.
   */
  const getAllStatusesAsync = orders.map(
    async (o: Order) => await getShippingStatusAsync(o.num),
  );

  /**
   * Now we choose between for await of vs Promise.all
   */
  if (false) {
    /**
     * Example of "for await of".
     * Make one async call at a time.
     * Find and attach the status to the order,
     * when each async call returns.
     */
    for await (let ss of getAllStatusesAsync) {
      const order = hero.orders.find((o: Order) => o.num === ss.orderNum);
      order.shippingStatus = ss;
    }
  } else {
    /**
     * Alternate option ... use Promise.all.
     * Make all the calls, then merge results when done.
     */
    const shippingStatuses = await Promise.all(getAllStatusesAsync);

    for (let ss of shippingStatuses) {
      const order = hero.orders.find((o: Order) => o.num === ss.orderNum);
      order.shippingStatus = ss;
    }
  }
  return hero;
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
