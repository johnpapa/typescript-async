import axios, { AxiosResponse, AxiosError } from 'axios';

const API = '/api';

interface Hero {
  id: number;
  name: string;
  description: string;
}

interface Callback<T> {
  (data: T): void;
}

interface CallbackError {
  (msg: string): void;
}

const getHeroesAsync = async function() {
  try {
    const response = await axios.get(`${API}/heroes`);
    let data = parseList(response);
    return data;
  } catch (error) {
    const msg = `Data Error: ${error?.message}`;
    console.error(msg);
    return [];
  }
};

const getHeroesPromise = function() {
  return axios
    .get<Hero[]>(`${API}/heroes`)
    .then((response: AxiosResponse<any>) => {
      let data = parseList(response);
      return Promise.resolve(data);
    })
    .catch((error: AxiosError) => {
      const msg = `Data Error: ${error?.message}`;
      console.error(msg);
      return Promise.reject(msg)
    });
};

const getHeroesCallback = function (callback: Callback<Hero[]>, callbackError?: CallbackError) {
  axios
    .get<Hero[]>(`${API}/heroes`)
    .then((response: AxiosResponse<any>) => {
      let data = parseList(response);
      callback(data);
    })
    .catch((error: AxiosError) => {
      const msg = `Data Error: ${error?.message}`;
      console.error(msg);
      callbackError(msg);
    });
};

const parseList = (response: any) => {
  if (response.status !== 200) throw Error(response.message);
  if (!response.data) return [];
  let list: Hero[] = response.data;
  if (typeof list !== 'object') {
    list = [];
  }
  return list;
};

export {
  getHeroesCallback,
   getHeroesAsync,
   getHeroesPromise,
   Hero,
   Callback,
   CallbackError
  };
