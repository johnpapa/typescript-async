import './design/index.scss';
import axios from 'axios';

interface Hero {
  id: number;
  name: string;
  description: string;
}

render();

async function render() {
  showFetching();
  let heroes: Hero[];
  try {
    heroes = await getHeroes();
  } catch (error) {
    console.log(error);
    showMessage(error);
  } finally {
    replaceHeroList(heroes);
  }
}

async function getHeroes() {
  try {
    const delay = (ms: any) => new Promise(res => setTimeout(res, ms));
    await delay(2000);
    const response = await axios.get(`api/heroes`);
    const heroes = parseList<Hero>(response);
    return heroes;
  } catch (error) {
    console.error(`Developer Error: Async Data Error: ${error.message}`);
    throw new Error('User Facing Error: Something bad happened');
  }

  function parseList<T>(response: any) {
    if (response.status !== 200) throw Error(response.message);
    if (!response.data) return [];
    let list: T[] = response.data;
    if (typeof list !== 'object') {
      list = [];
    }
    return list;
  }
}

function replaceHeroList(heroes?: Hero[]) {
  const heroPlaceholder = document.querySelector('.hero-list');
  const el = heroes && heroes.length ? createList() : createNoneFound();
  heroPlaceholder.replaceWith(el);

  function createList() {
    const ul = document.createElement('ul');
    ul.classList.add('list', 'hero-list');
    heroes.forEach((hero: Hero) => {
      const template = document.getElementById(
        'hero-template'
      ) as HTMLTemplateElement;
      const heroCard = document.importNode(template.content, true);
      heroCard.querySelector('.description').textContent = hero.description;
      heroCard.querySelector('.name').textContent = hero.name;
      heroCard.querySelector('.card').classList.add(hero.name);
      ul.appendChild(heroCard);
    });
    return ul;
  }

  function createNoneFound() {
    const div = document.createElement('hero-list');
    div.innerText = 'No heroes found';
    return div;
  }
}

function showFetching() {
  const heroPlaceholder = document.querySelector('.hero-list');
  // eslint-disable-next-line prefer-const
  let option = '2';
  switch (option) {
    case '1':
      heroPlaceholder.innerHTML = `<progress
            class="hero-list progress is-medium is-info"
            max="100"
          ></progress>
      `;
      break;

    case '2':
      const progressEl = document.createElement('progress');
      progressEl.classList.add('hero-list', 'progress', 'is-medium', 'is-info');
      const maxAttr = document.createAttribute('max');
      maxAttr.value = '100';
      progressEl.setAttributeNode(maxAttr);
      heroPlaceholder.replaceWith(progressEl);
      break;

    case '3':
      const template = document.getElementById(
        'progress-template'
      ) as HTMLTemplateElement;
      const fetchingNode = document.importNode(template.content, true);
      heroPlaceholder.replaceWith(fetchingNode);
      break;

    default:
      break;
  }
}

function showMessage(text: string, title = 'Info') {
  const el = document.getElementById('message-box');
  el.style.visibility = !!text ? 'visible' : 'hidden';
  el.querySelector('.message-header').textContent = title;
  el.querySelector('.message-body').textContent = text;
}
