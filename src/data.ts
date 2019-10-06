import axios, { AxiosResponse } from 'axios';

const API = '/api';

interface Hero {
  id: number;
  name: string;
  description: string;
}

const getHeroesAsync = async function() {
  try {
    const response: AxiosResponse<any> = await axios.get(`${API}/heroes`);
    let data = parseList(response);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getHeroesPromise: () => Promise<Hero[]> = function() {
  return axios
    .get<Hero[]>(`${API}/heroes`)
    .then((response: AxiosResponse<any>) => {
      let data = parseList(response);
      return data;
    })
    .catch(error => {
      console.error(error);
      return [];
    });
};

const getHeroesCallback: (callback: (data: Hero[]) => any) => void = function(
  callback: (data: Hero[]) => any,
) {
  return axios
    .get<Hero[]>(`${API}/heroes`)
    .then((response: AxiosResponse<any>) => {
      let data = parseList(response);
      return callback(data);
    })
    .catch(error => {
      console.error(error);
      return [];
    });
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

export { getHeroesCallback, getHeroesAsync, getHeroesPromise, Hero };
