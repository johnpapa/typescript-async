// import Axios, { AxiosResponse, AxiosError } from 'axios';

import axios from 'axios';
// import { AxiosPromise } from 'axios';

const API = '/api';

const heroes = [
  {
    id: '10',
    name: 'Madelyn',
    description: 'the cat whisperer',
  },
  {
    id: '20',
    name: 'Haley',
    description: 'pen wielder',
  },
  {
    id: '30',
    name: 'Ella',
    description: 'fashionista',
  },
  {
    id: '40',
    name: 'Landon',
    description: 'Mandalorian mauler',
  },
];

const getHeroes2 = async function() {
  // cant just return this, because its not what we want
  // return response.data;
  // but what if there is bad data in the response?
  // let data = response.data;
  // Let's parse it better
  try {
    const response = await axios.get(`${API}/heroes.json`);
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
async function getHeroes() {
  return heroes;
}
export { getHeroes };
