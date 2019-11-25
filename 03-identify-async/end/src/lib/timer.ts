import { showMessage } from './dom';

export const sayHelloTimer = function(ms: number) {
  let counter = 1;
  const callback = (ms: number) => {
    showMessage(
      `Hello every ${ms} milliseconds. (${counter} iterations)`,
      'Response from Timer',
    );
    counter++;
    if (counter === 5) {
      clearInterval(intervalId);
      showMessage(
        `Goodbye. We said hello every ${ms} milliseconds. (${counter} iterations)`,
        'Response from Timer',
      );
    }
  };

  const intervalId = setInterval(callback, ms, ms);
};
