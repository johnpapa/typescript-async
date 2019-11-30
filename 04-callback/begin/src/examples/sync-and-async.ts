import { showMessage } from '../lib';
import { ingredients } from './ingredients';

export function forEachExample() {
  let index = 0;
  ingredients.forEach(name => {
    index++;
    showMessage(`${index} - ${name}`);
    console.log(`${index} - ${name}`);
  });
}

export function setTimeoutExample() {
  console.clear();
  showMessage('Me: How are you?');
  console.log('Me: How are you?');
  setTimeout(() => {
    showMessage('You: I am fine, thank you! How are you?');
    console.log('You: I am fine, thank you! How are you?');
    setTimeout(() => {
      showMessage('Me: Well, thanks!');
      console.log('Me: Well, thanks!');
      setTimeout(() => {
        showMessage(`You: That's good to hear!`);
        console.log(`You: That's good to hear!`);
      }, 1500);
    }, 1500);
  }, 1500);
}
