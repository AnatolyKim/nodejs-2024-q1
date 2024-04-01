import { IProduct } from "./product.model";

export interface ICartItem {
  product: IProduct;
  count: number;
}

export interface ICart{
  id: string;
  userId: string;
  isDeleted: boolean;
  items: ICartItem[];
}

export interface ICartSummary {
  cart: ICart;
  total: number;
}
