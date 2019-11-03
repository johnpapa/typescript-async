export const API = '/api';

let apiUrl = API;

const DELAY = 1000;

const dev = {
  breakAPI() {
    apiUrl = '/badapiurl';
  },
  fixAPI() {
    apiUrl = API;
  },
};

export { apiUrl, DELAY, dev };
