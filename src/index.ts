import { Hero } from './foo';
import './design/index.scss';

function component() {
  const hero = new Hero('Oliver', 0);

  const element = document.createElement('div');

  element.innerHTML = `hello ${hero.name}`;

  return element;
}

document.body.appendChild(component());
