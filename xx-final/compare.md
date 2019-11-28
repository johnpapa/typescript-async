# compare files

```typescript
const getHeroTreeCallback = function(email: string, callback: any) {
  getHeroCallback(email, hero => {
    getOrdersCallback(hero.id, orders => {
      hero.orders = orders;
      getAccountRepCallback(hero.id, accountRep => {
        hero.accountRep = accountRep;
        callback(hero);
      });
    });
  });
};

const getHeroTreePromise = function(searchEmail: string) {
  let hero: Hero;
  return getHeroPromise(searchEmail)
    .then((hero: Hero) => Promise.all([getOrders(hero), getAccountRep(hero)]))
    .then((result: [Order[], AccountRepresentative]) => {
      const [orders, accountRep] = result;
      hero.orders = orders;
      hero.accountRep = accountRep;
      return hero;
    });
};

const getHeroTreeAsync = async function(email: string) {
  const hero = await getHeroAsync(email);
  const [orders, accountRep] = await Promise.all([
    getOrdersAsync(hero),
    getAccountRepAsync(hero),
  ]);
  hero.orders = orders;
  hero.accountRep = accountRep;
  return hero;
};
```
