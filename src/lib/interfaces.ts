export interface Hero {
  id: number;
  name: string;
  description: string;
  email: string;
  orders?: Order[];
}
export interface Order {
  heroId: number;
  num: number;
  items: Item[];
}

export interface Item {
  orderNum: number;
  name: string;
  qty: number;
  price: number;
}
export interface Callback<T> {
  (data: T): void;
}
export interface CallbackError {
  (msg?: string): void;
}
