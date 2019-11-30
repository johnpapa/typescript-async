/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Baking Cookies
 *
 * This code does not run.
 * It is here as an example
 * of a mixed sync and async flow.
 */

import { ingredients } from './ingredients';

export function bakeCookies() {
  const bowl = combine(ingredients);

  const batter = mix(bowl);

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
    const bowl = {
      /* combined indgredients */
    };
    return bowl;
  }

  function mix(bowl: any) {
    // Logic to mix the ingredients
    const batter = {
      /* mixed ingredients */
    };
    return batter;
  }

  function bake(
    cookieSheet: { batter: any; temp: number; minutes: number },
    cb: (cookies: any) => void,
  ) {
    // Logic to bake the cookies and then we return them
    const cookies: any[] = [
      /*Cook the cookies on the cookie sheet */
    ];
    cb(cookies);
  }

  function eat(cookies: any) {
    console.log('yummy!');
  }
}
