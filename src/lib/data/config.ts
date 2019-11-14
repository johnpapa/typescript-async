export const API = '/api';

let apiUrl = API;

const dev = {
  breakAPI() {
    apiUrl = '/badapiurl';
  },
  fixAPI() {
    apiUrl = API;
  },
};

const parseList = <T>(response: any) => {
  if (response.status !== 200) throw Error(response.message);
  if (!response.data) return [];
  let list: T[] = response.data;
  if (typeof list !== 'object') {
    list = [];
  }
  return list;
};

export { apiUrl, dev, parseList };
