export function setText(
  el: DocumentFragment | HTMLElement,
  selector: string,
  text: string,
) {
  el.querySelector(selector).textContent = text.toString();
  return el;
}

export function getText(el: DocumentFragment | HTMLElement, selector: string) {
  return el.querySelector(selector).textContent;
}

export const createDiv = (...classList: string[]) => {
  const el = document.createElement('div');
  el.classList.add(...classList);
  return el;
};

export function cloneElementsFromTemplate(templateName: string) {
  const template = document.getElementById(templateName) as HTMLTemplateElement;
  const clone = document.importNode(template.content, true);
  return clone;
}

export function showMessage(text = '', title = 'Info', append = false) {
  const el = document.getElementById('message-box');
  el.style.visibility = !!text ? 'visible' : 'hidden';

  let newText = text;
  if (append) {
    let oldText = getText(el, '.message-body');
    newText = `${oldText}\r\n${text}`;
  }

  setText(el, '.message-header', title);
  setText(el, '.message-body', newText);
}

export function showFetching(selector: string) {
  const progressClone = cloneElementsFromTemplate('progress-template');
  const heroPlaceholder = document.querySelector(selector);
  heroPlaceholder.replaceWith(progressClone);
}
