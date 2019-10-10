export function setText(
  el: DocumentFragment | HTMLElement,
  selector: string,
  text: any
) {
  el.querySelector(selector).textContent = text.toString();
  return el;
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
