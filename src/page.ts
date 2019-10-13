import './design/index.scss';
import axios from 'axios';

interface Hero {
  id: number;
  name: string;
  description: string;
}

const button = document.querySelector('.refresh-button');
button.addEventListener('click', render);

async function render() {
  showFetching();
  let heroes: Hero[];
  try {
    heroes = await getHeroes();
  } catch (error) {
    console.log(error);
    showMessage(error.message);
  } finally {
    showFetching(false);
    replaceHeroList(heroes);
  }
}

async function getHeroes() {
  try {
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
  if (heroes && heroes.length) {
    createList();
  } else {
    heroPlaceholder.replaceWith(createNoneFound());
  }

  function createList() {
    const heroPlaceholder = document.querySelector('.hero-list');
    // eslint-disable-next-line prefer-const
    let option = 2;
    switch (option) {
      case 1:
        createListWithStrings();
        break;
      case 2:
        createListWithDOMAPI();
        break;
      case 3:
        createListWithTemplate();
        break;
    }

    function createListWithStrings() {
      const rows = heroes.map(hero => {
        return `<li>
            <div class="card">
              <div class="card-content">
                <div class="content">
                  <div class="name">${hero.name}</div>
                  <div class="description">${hero.description}</div>
                </div>
              </div>
            </div>
          </li>`;
      });
      const html = `<ul>${rows.join()}</ul>`;
      heroPlaceholder.innerHTML = html;
    }

    function createListWithDOMAPI() {
      const ul = document.createElement('ul');
      ul.classList.add('list', 'hero-list');
      heroes.forEach(hero => {
        const li = document.createElement('li');
        const card = document.createElement('div');
        card.classList.add('card');
        li.appendChild(card);
        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');
        card.appendChild(cardContent);
        const content = document.createElement('div');
        content.classList.add('content');
        cardContent.appendChild(content);
        const name = document.createElement('div');
        name.classList.add('name');
        name.textContent = hero.name;
        cardContent.appendChild(name);
        const description = document.createElement('div');
        description.classList.add('description');
        description.textContent = hero.description;
        cardContent.appendChild(description);
        ul.appendChild(li);
      });
      heroPlaceholder.replaceWith(ul);
    }

    function createListWithTemplate() {
      const ul = document.createElement('ul');
      ul.classList.add('list', 'hero-list');
      heroes.forEach((hero: Hero) => {
        const template = document.getElementById(
          'hero-template'
        ) as HTMLTemplateElement;
        const heroCard = document.importNode(template.content, true);
        heroCard.querySelector('.description').textContent = hero.description;
        heroCard.querySelector('.name').textContent = hero.name;
        ul.appendChild(heroCard);
      });
      heroPlaceholder.replaceWith(ul);
    }
  }

  function createNoneFound() {
    const div = document.createElement('hero-list');
    div.innerText = 'No heroes found';
    return div;
  }
}

function showFetching(show = true) {
  const progressEl = document.getElementById('progress');
  const heroListEl = document.querySelector('.hero-list') as HTMLElement;
  heroListEl.style.visibility = show ? 'hidden' : 'visible';
  progressEl.style.display = show ? 'block' : 'none';
  return;
  const heroPlaceholder = document.querySelector('.hero-list');
  // eslint-disable-next-line prefer-const
  let option = '3';
  switch (option) {
    case '1':
      heroPlaceholder.innerHTML = `<progress
            class="hero-list progress is-medium is-info" max="100"
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
