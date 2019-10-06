import { getHeroes, Hero } from './data';
import { createDiv } from './dom';

export async function getHeroesComponent() {
  const list = document.createElement('ul');
  list.classList.add('list');

  const heroes = await getHeroes();

  heroes.forEach((hero: Hero) => {
    const li = document.createElement('li');
    const card = createHeroCard(hero);
    li.appendChild(card);
    list.appendChild(li);
  });
  return list;
}

function createHeroCard(hero: Hero) {
  const card = createDiv();
  card.classList.add('card');
  const cardContent = createDiv();
  cardContent.classList.add('card-content');
  card.appendChild(cardContent);
  const content = createDiv();
  content.classList.add('content');
  cardContent.appendChild(content);
  const name = createDiv();
  name.classList.add('name');
  name.innerText = hero.name;
  content.appendChild(name);
  const description = createDiv();
  description.classList.add('description');
  description.innerText = hero.description;
  content.appendChild(description);
  return card;
}
