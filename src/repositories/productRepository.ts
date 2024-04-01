import { MOCK_PRODUCTS } from "../constants/db-mock";
import { ERRORS_MESSAGES } from "../constants/errors";
import { IProduct } from "../models/product.model";

export const getProductById = (id: string): Promise<IProduct> => {
  return new Promise((resolve, reject) => {
    const product = MOCK_PRODUCTS.find((product) => product.id === id);

    if (product) {
      resolve(product);
    } else {
      reject(new Error(ERRORS_MESSAGES.PRODUCT_NOT_FOUND));
    }
  });
};

export const getProducts = (): Promise<IProduct[]> => {
  return Promise.resolve(MOCK_PRODUCTS);
};