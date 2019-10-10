import axios, { AxiosResponse, AxiosError } from 'axios';

import { DELAY, API } from './config';
import { Order, Callback, CallbackError, Hero } from './interfaces';

// we could pass this back every time.
// the argument here is you can avoid try/catch everywhere but you instead have to package the error.
// interface Message {
//   response: any;
//   error: string;
// }

// first show without any try/catch as we explain how errors bubble upo.
// then introduce try/catch to show how we can do other stuff
// const getHeroesAsync2 = async function() {
//   const response = await axios.get(`${API}/heroes`);
//   const data = parseList(response);
//   return data;
// };

const getHeroesAsync = async function() {
  await delay(DELAY);
  try {
    const response = await axios.get(`${API}/heroes`);
    const data = parseList<Hero>(response);
    return data;
  } catch (error) {
    // This is a technical error, targeting the developers.
    // You should always log it here (lowest level). This serves the developer.
    // If I want to propogate this back to the callers,
    // I should determine how to propogate it out and if I want to transform it.
    console.error(`Developer Error: Async Data Error: ${error.message}`);

    // How do I feel about errors in this path?
    // option 1: log the error here,
    // and let the caller know an error occurred, but dont change the return type
    throw new Error('User Facing Error: Something bad happened');

    // option 2: log the error here,
    // return the error object to the caller
    // return {error: msg}; // return something
  }
};

const getHeroAsync = async function(email: string) {
  await delay(DELAY);
  try {
    const response = await axios.get(`${API}/heroes?email=${email}`);
    const data = parseList<Hero>(response);
    return data;
  } catch (error) {
    // This is a technical error, targeting the developers.
    // You should always log it here (lowest level). This serves the developer.
    // If I want to propogate this back to the callers,
    // I should determine how to propogate it out and if I want to transform it.
    console.error(`Developer Error: Async Data Error: ${error.message}`);

    // How do I feel about errors in this path?
    // option 1: log the error here,
    // and let the caller know an error occurred, but dont change the return type
    throw new Error('User Facing Error: Something bad happened');

    // option 2: log the error here,
    // return the error object to the caller
    // return {error: msg}; // return something
  }
};

const getOrdersAsync = async function(heroId?: number) {
  try {
    const url = heroId ? `${API}/orders/${heroId}` : `${API}/orders`;
    const response = await axios.get(url);
    const data = parseList<Order>(response);
    return data;
  } catch (error) {
    console.error(`Developer Error: Async Data Error: ${error.message}`);
    throw new Error('User Facing Error: Something bad happened');
  }
};

const getHeroesPromise = function() {
  return axios
    .get<Hero[]>(`${API}/heroes`)
    .then((response: AxiosResponse<any>) => {
      const data = parseList<Hero>(response);
      return Promise.resolve(data);
    })
    .catch((error: AxiosError) => {
      const msg = `Promise Data Error: ${error.message}`;
      console.error(msg);
      //TODO: handle both dev and user error

      return Promise.reject(msg);

      // resolve is the response object
    });
};

const getHeroesCallback = function(
  callback: Callback<Hero[]>,
  callbackError?: CallbackError
) {
  axios
    .get<Hero[]>(`${API}/heroes`)
    .then((response: AxiosResponse<any>) => {
      const data = parseList<Hero>(response);
      callback(data);
    })
    .catch((error: AxiosError) => {
      const msg = `Callback Data Error: ${error.message}`;
      console.error(msg);
      callbackError();
    });
};

const delay = (ms: any) => new Promise(res => setTimeout(res, ms));

const parseList = <T>(response: any) => {
  if (response.status !== 200) throw Error(response.message);
  if (!response.data) return [];
  let list: T[] = response.data;
  if (typeof list !== 'object') {
    list = [];
  }
  return list;
};

const parseData = <T>(response: any) => {
  if (response.status !== 200) throw Error(response.message);
  if (!response.data) return undefined;
  let data: T = response.data;
  if (typeof data !== 'object') {
    data = undefined;
  }
  return data;
};

const getHeroesDelayedAsync = async function() {
  await delay(DELAY);
  return await [
    {
      id: 10,
      name: 'Madelyn',
      description: 'the cat whisperer',
    },
    {
      id: 20,
      name: 'Haley',
      description: 'pen wielder',
    },
    {
      id: 30,
      name: 'Ella',
      description: 'fashionista',
    },
    {
      id: 40,
      name: 'Landon',
      description: 'arc trooper',
    },
  ];
};

export {
  getHeroAsync,
  getHeroesCallback,
  getHeroesAsync,
  getOrdersAsync,
  getHeroesPromise,
  getHeroesDelayedAsync,
};
