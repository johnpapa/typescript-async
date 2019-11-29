/**
 * Baking Cookies
 *
 * This code does not run.
 * It is here as an example
 * of a mixed sync and async flow.
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
  '2 cups (12-oz. pkg.) chocolate chips'
];

function bakeCookies() {
  const combined = combine(ingredients);

  const batter = mix(combined);

  const cookieSheet = { batter, temp: 375, minutes: 10 };

  bake(cookieSheet, cookies => {
    /**
     * we must wait 10 minutes for the oven
     * to bake the cookies
     * before we eat
     **/
    eat(cookies);
  });

  /**
   * private functions are below
   *
   **/

  function combine(i: any) {
    // Logic to combine the ingredients
    const combined = {
      /* combined indgredients */
    };
    return combined;
  }
  function mix(c: any) {
    // Logic to mix the ingredients
    const batter = {
      /* mixed ingredients */
    };
    return batter;
  }
  function bake(cookieSheet: { batter: any; temp: number; minutes: number }, cb: (cookies: any) => void) {
    // Logic to bake the cookies and then we return them
    const cookies = [
      /*Cook the cookies on the cookie sheet */
    ];
    cb(cookies);
  }
  function eat(cookies: any) {
    console.log('yummy!');
  }
}

function forEachExample() {
  let index = 0;
  ingredients.forEach(name => {
    console.log(`${index} - ${name}`);
  });
}

function setTimeoutExample() {
  console.clear();
  console.log('Me: How are you?');
  setTimeout(() => {
    console.log('You: I am fine, thank you! How are you?');
    setTimeout(() => {
      console.log('Me: Well, thanks!');
    }, 1500);
  }, 1500);
}
