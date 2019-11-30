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
    console.log(`${index} - ${name}`);
  });
}

export function setTimeoutExample() {
  console.clear();
  console.log('Me: How are you?');
  setTimeout(() => {
    console.log('You: I am fine, thank you! How are you?');
    setTimeout(() => {
      console.log('Me: Well, thanks!');
      setTimeout(() => {
        console.log(`You: That's good to hear!`);
      }, 1500);
    }, 1500);
  }, 1500);
}
