import { ICart } from "../models/cart.model";
import { IOrder } from "../models/order.model";
import { IProduct } from "../models/product.model";
import { IUser } from "../models/user.model";

export const MOCK_PRODUCTS: IProduct[] = [{
  id: '1',
  title: 'Product 1',
  description: 'This is a description for product 1.',
  price: 9.99
}]

export const USERS: IUser[] = [
  {
    id: 'admin',
  }
];

export const ORDERS: IOrder[] = [];

export const CARTS: ICart[] = [];