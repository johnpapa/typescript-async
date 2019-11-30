import { showMessage, cloneElementsFromTemplate } from '../lib';

/**
 * Examples of sync and async callbacks.
 *
 */
const ingredients = [
  '2 1/4 cups all-purpose flour',
  '1 teaspoon baking soda',
  '1 teaspoon salt',
  '1 cup (2 sticks) butter',
  '3/4 cup granulated sugar',
  '3/4 cup packed brown sugar',
  '1 teaspoon vanilla extract',
  '2 large eggs',
  '2 cups (12-oz. pkg.) chocolate chips',
];

export function forEachExample() {
  let index = 0;
  ingredients.forEach(name => {
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

export function getDataAfterDelay(
  delayMs: number,
  callback: (data: any[]) => void,
) {
  setTimeout(() => {
    const data = ingredients;
    callback(data);
  }, delayMs);
}
