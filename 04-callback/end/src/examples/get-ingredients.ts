import { ingredients } from './ingredients';

export function getDataAfterDelay(
  delayMs: number,
  callback: (data: string[]) => void,
) {
  setTimeout(() => {
    const data = ingredients;
    callback(data);
  }, delayMs);
}
