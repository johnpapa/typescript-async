import axios, { AxiosResponse, AxiosError } from 'axios';

const API = '/api';
const DELAY = 500;

interface Hero {
  id: number;
  name: string;
  description: string;
}

interface Callback<T> {
  (data: T): void;
}

interface CallbackError {
  (msg?: string): void;
}

const getHeroesAsync = async function() {
  await delay(DELAY);
  try {
    const response = await axios.get(`${API}/heroes`);
    const data = parseList(response);
    return data;
  } catch (error) {
    const msg = `Async Data Error: ${error?.message}`;
    console.error(msg);
    // return [];
    throw new Error('TODO');
  }
};

const getHeroesPromise = function() {
  return axios
    .get<Hero[]>(`${API}/heroes`)
    .then((response: AxiosResponse<any>) => {
      const data = parseList(response);
      return Promise.resolve(data);
    })
    .catch((error: AxiosError) => {
      const msg = `Promise Data Error: ${error.message}`;
      console.error(msg);
      return Promise.reject();
    });
};

const getHeroesCallback = function(
  callback: Callback<Hero[]>,
  callbackError?: CallbackError,
) {
  axios
    .get<Hero[]>(`${API}/heroes`)
    .then((response: AxiosResponse<any>) => {
      const data = parseList(response);
      callback(data);
    })
    .catch((error: AxiosError) => {
      const msg = `Callback Data Error: ${error.message}`;
      console.error(msg);
      callbackError();
    });
};

const delay = (ms: any) => new Promise(res => setTimeout(res, ms));

const parseList = (response: any) => {
  if (response.status !== 200) throw Error(response.message);
  if (!response.data) return [];
  let list: Hero[] = response.data;
  if (typeof list !== 'object') {
    list = [];
  }
  return list;
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
  getHeroesCallback,
  getHeroesAsync,
  getHeroesPromise,
  getHeroesDelayedAsync,
  Hero,
  Callback,
  CallbackError,
};
