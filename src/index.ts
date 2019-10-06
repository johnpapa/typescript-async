import './design/index.scss';

import { getHeroesComponent } from './heroes.component';
import { createDiv } from './dom';

async function getComponent() {
  const element = createDiv();
  const heroesComponent = await getHeroesComponent();
  element.appendChild(heroesComponent);
  return element;
}

async function render() {
  const mainContent = document.querySelector('.main-content');
  const component = await getComponent();
  mainContent.appendChild(component);
}

render();
