// Source: https://github.com/rodrigogs/conditional-race/blob/master/lib/conditionalRace.js

export const conditionalRace = (promises, conditionFn) => new Promise((resolve, reject) => {

  if (!(promises instanceof Array)) throw new Error('conditionaRace\'s first argument should be an array.');
  if (!(conditionFn instanceof Function)) throw new Error('conditionaRace\'s second argument should be a function.');

  let fulfilled = false;
  let elapsed = 0;

  promises.forEach(async (promise) => {
    try {
      const result = await promise;
      if (!fulfilled && conditionFn(result)) {
        resolve(result);
        fulfilled = true;
      }
    } catch (err) {
      if (!fulfilled) {
        reject(err);
        fulfilled = true;
      }
    }

    elapsed += 1;
    if (elapsed === promises.length && !fulfilled) resolve(null);
  });
})