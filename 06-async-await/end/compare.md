# compare files

```typescript
// Callback
firstFunction(args1, function() {
  secondFunction(args2, function() {
    thirdFunction(args3, function() {
      // And so on...
    });
  });
});

// Promise
function getThings(a) {
  return getThing1(a).then(b => getThing2(b));
  then(c => getThing3(c));
}

function basicPromise() {
  return firstFunction(args1)
    .then(args2 => secondFunction(args2))
    .then(args3 => thirdFunction(args3));
}

// Async/Await
async function getThings(a) {
  const b = await getThing1(a);
  const c = await getThing2(b);
  return await getThing3(c);
}

function basicAsyncAwait() {
  const args2 = await firstFunction(args1);
  const args3 = await secondFunction(args2);
  return await thirdFunction(args3);
}

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
