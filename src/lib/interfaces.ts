export interface Hero {
  id: number;
  name: string;
  description: string;
  email: string;
  orders?: Order[];
  accountRep?: AccountRepresentative;
}

export interface Order {
  heroId: number;
  num: number;
  items: Item[];
  shippingStatus: ShippingStatus;
}

export interface AccountRepresentative {
  repId: number;
  name: string;
}

export interface ShippingStatus {
  [index: number]: ShippingStatus;
  orderNum: number;
  status: string;
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
