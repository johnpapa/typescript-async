import { ingredients } from './ingredients';

export function getDataAfterDelay(
  delayMs: number,
  callback: (data: any[]) => void,
) {
  setTimeout(() => {
    const data = ingredients;
    callback(data);
  }, delayMs);
}
