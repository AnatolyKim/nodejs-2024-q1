import { v4 as uuidv4 }  from 'uuid';
import { ICart } from '../models/cart.model';
import { IOrder } from '../models/order.model';
import { ERRORS_MESSAGES } from '../constants/errors';
import { CARTS, ORDERS } from '../constants/db-mock';

export const getCart = (userId: string): Promise<ICart> => {
  return new Promise((resolve, reject) => {
    const cart = CARTS.find((cart) => cart.userId === userId);

    if (cart) {
      resolve(cart);
    } else {
      reject(new Error(ERRORS_MESSAGES.CART_NOT_FOUND));
    }
  });
};

export const createCart = (cart: Omit<ICart, 'id'>): Promise<ICart> => {
  return new Promise((resolve) => {
    const newCart = {
      id: uuidv4(),
      ...cart,
    };

    CARTS.push(newCart);

    resolve(newCart);
  });
};

export const updateCart = (userId: string, cart: ICart): Promise<ICart> => {
  return new Promise((resolve, reject) => {
    const userCartIndex = CARTS.findIndex((cart) => cart.userId === userId);

    if (userCartIndex < 0) {
      reject(new Error(ERRORS_MESSAGES.CART_NOT_FOUND));
    } else {
      CARTS.splice(userCartIndex, 1, cart);
      resolve(cart);
    }
  });
};

export const emptyCart = (userId: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const cart = CARTS.find((cart) => cart.userId === userId);

    if (cart) {
      cart.items = [];
      resolve(true);
    } else {
      reject(new Error(ERRORS_MESSAGES.CART_NOT_FOUND));
    }
  });
};

export const createOrder = (orderData: Omit<IOrder, 'id'>): Promise<IOrder> => {
  return new Promise((resolve) => {
    const order = {
      id: uuidv4(),
      ...orderData,
    };

    ORDERS.push(order);

    resolve(order);
  });
};
