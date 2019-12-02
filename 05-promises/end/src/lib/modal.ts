export const openModal = async function () {
  const listenerYes = () => closeModal('yes');
  const listenerNo = () => closeModal('no');
  document.querySelector('.modal-yes').addEventListener('click', listenerYes);
  document.querySelector('.modal-no').addEventListener('click', listenerNo);

  const modalWindow = document.getElementById('modal');

  if (modalWindow.classList) {
    modalWindow.classList.add('is-active');
  }

  let resolve: (value?: string) => void;
  const responsePromise = new Promise<string>((res, rej) => {
    resolve = res;
  });
  /**
   * This next line returns the promise.
   * The caller then waits for the promise to resolve.
   */
  return responsePromise;

  function closeModal(yesno: 'yes' | 'no') {
    if (modalWindow.classList) {
      modalWindow.classList.remove('is-active');
    }

    modalWindow
      .querySelector('.modal-yes')
      .removeEventListener('click', listenerYes);
    modalWindow
      .querySelector('.modal-no')
      .removeEventListener('click', listenerNo);

    return resolve(yesno);
  }
};
