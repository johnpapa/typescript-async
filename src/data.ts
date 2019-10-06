// import Axios, { AxiosResponse, AxiosError } from 'axios';

import axios from 'axios';
// import { AxiosPromise } from 'axios';

const API = '/api';

interface Hero {
  id: number;
  name: string;
  description: string;
}

const getHeroes = async function() {
  // cant just return this, because its not what we want
  // return response.data;
  // but what if there is bad data in the response?
  // let data = response.data;
  // Let's parse it better
  try {
    const response = await axios.get(`${API}/heroes`);
    let data = parseList(response);
    return data;
  } catch (error) {
    // console.error(error);
    return [];
  }
};

const parseList = (response: any) => {
  if (response.status !== 200) throw Error(response.message);
  if (!response.data) return [];
  let list = response.data;
  if (typeof list !== 'object') {
    list = [];
  }
  return list;
};

export { getHeroes, Hero };
