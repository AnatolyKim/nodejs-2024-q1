import { ORDER_STATUSES } from "../constants/order";
import { ICartItem } from "./cart.model";

export interface IOrder {
  id: string,
  userId: string;
  cartId: string;
  items: ICartItem[];
  payment: {
    type: string,
    address?: any,
    creditCard?: any,
  },
  delivery: {
    type: string,
    address: any,
  },
  comments: string,
  status: ORDER_STATUSES;
  total: number;
}
