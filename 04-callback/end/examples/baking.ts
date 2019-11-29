/**
 * Baking Cookies
 *
 * This code does not run.
 * It is here as an example
 * of a mixed sync and async process.
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

function bakeCookies() {
  const combined = combine(ingredients);
  const batter = mix(combined);

  const intoTheOven = { batter, temp: 375, minutes: 10 };

  bake(intoTheOven, cookies => {
    /**
     * we must wait 10 minutes for the oven
     * to bake the cookies
     * before we eat
     **/
    eat(cookies);
  });

  function combine(i: any) {
    // Logic to combine the ingredients
    return i;
  }
  function mix(i: any) {
    // Logic to mix the ingredients
    return i;
  }
  function bake(
    baking: { batter: any; temp: number; minutes: number },
    cb: (cookies: any) => void,
  ) {
    // Logic to bake the cookies and then we return them
    cb('cookies');
  }
  function eat(cookies: any) {
    console.log('yummy!');
  }
}
