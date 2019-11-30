import { showMessage } from './dom';

export const sayHelloTimer = function (ms: number) {
  let counter = 0;
  showMessage(`Starting the timer`, 'Response from Timer');

  const callback = (ms: number) => {
    counter++;
    showMessage(
      `Hello every ${ms} milliseconds. (${counter} iterations)`,
      'Response from Timer',
      true,
    );

    if (counter === 5) {
      showMessage(
        `Goodbye. We said hello every ${ms} milliseconds. (after ${counter} iterations)`,
        'Response from Timer',
        true,
      );
      clearInterval(intervalId);
    }
  };

  const intervalId = setInterval(callback, ms, ms);
};
