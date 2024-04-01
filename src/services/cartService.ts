import { ERRORS_MESSAGES } from '../constants/errors';
import { ORDER_STATUSES } from '../constants/order';
import { ICart, ICartItem, ICartSummary } from '../models/cart.model';
import { IOrder } from '../models/order.model';
import * as cartRepository from '../repositories/cartRepository';

export const getCart = async (userId: string): Promise<ICartSummary> => {
  try {
    const cart = await cartRepository.getCart(userId);

    return createCartSummary(cart);
  } catch (error) {
    return createCart(userId);
  }
};

export const createCart = async (userId: string): Promise<ICartSummary> => {
  const defaultCartData = {
    userId,
    isDeleted: false,
    items: [],
  };

  const cart = await cartRepository.createCart(defaultCartData);

  return createCartSummary(cart);
};


export const updateCart = async (userId: string, cart: ICart): Promise<ICartSummary> => {
  const updatedCart = await cartRepository.updateCart(userId, cart);

  return createCartSummary(updatedCart);
};

export const emptyCart = (userId: string): Promise<boolean> => {
  return cartRepository.emptyCart(userId);
};

export const createOrder = async (userId: string): Promise<IOrder> => {
  const {id , items } = await cartRepository.getCart(userId);

  if (!items.length) {
    throw new Error(ERRORS_MESSAGES.CART_IS_EMPTY);
  }

  const order = {
    items: copyItems(items),
    userId,
    cartId: id,
    payment: {
      type: '',
    },
    delivery: {
      type: '',
      address: '',
    },
    comments: '',
    status: ORDER_STATUSES.CREATED,
    total: countTotalPrice(items),
  }

  return cartRepository.createOrder(order);
};

const countTotalPrice = (items: ICartItem[]) => {
  return items.reduce((acc, item) => acc + item.product.price * item.count, 0);
}

const createCartSummary = (cart: ICart): ICartSummary => {
  return {
    cart,
    total: countTotalPrice(cart.items),
  };
}

const copyItems = (items: ICartItem[]) => {
  return items.map(item => ({ ...item }));
}