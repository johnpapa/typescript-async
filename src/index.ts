import './design/index.scss';
import { getHeroesComponent } from './heroes-component';

async function getComponent() {
  const element = document.createElement('div');

  const heroesComponent = await getHeroesComponent();
  element.appendChild(heroesComponent);

  return element;
}

// function heroesComponent() {
//   const list = document.createElement('ul');
//   list.classList.add('list');

//   const heroes = [
//     {
//       id: '10',
//       name: 'Madelyn',
//       description: 'the cat whisperer',
//     },
//     {
//       id: '20',
//       name: 'Haley',
//       description: 'pen wielder',
//     },
//     {
//       id: '30',
//       name: 'Ella',
//       description: 'fashionista',
//     },
//     {
//       id: '40',
//       name: 'Landon',
//       description: 'Mandalorian mauler',
//     },
//   ];
//   heroes.forEach(h => {
//     const li = document.createElement('li');

//     const card = document.createElement('div');
//     card.classList.add('card');

//     const cardContent = document.createElement('div');
//     cardContent.classList.add('card-content');
//     card.appendChild(cardContent);

//     const content = document.createElement('div');
//     content.classList.add('content');
//     cardContent.appendChild(content);

//     const name = document.createElement('div');
//     name.classList.add('name');
//     name.innerText = h.name;
//     content.appendChild(name);

//     const description = document.createElement('div');
//     description.classList.add('description');
//     description.innerText = h.description;
//     content.appendChild(description);

//     li.appendChild(card);
//     list.appendChild(li);
//   });
//   return list;
//   // <ul class="list" >
//   // <li>
// }

async function go() {
  const mainContent = document.querySelector('.main-content');
  const component = await getComponent();
  mainContent.appendChild(component);
}

go();
