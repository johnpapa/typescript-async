import { AxiosResponse } from 'axios';

export const API = '/api';

let apiUrl = API;

const parseList = <T>(response: AxiosResponse) => {
  if (response.status !== 200) throw Error(response.statusText);
  if (!response.data) return [];
  let list: T[] = response.data;
  if (typeof list !== 'object') {
    list = [];
  }
  return list;
};

export { apiUrl, parseList };
