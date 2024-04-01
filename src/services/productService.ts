import * as productRepository from '../repositories/productRepository';

export const getProducts = () => {
  return productRepository.getProducts();
};

export const getProductById = (id: string) => {
  return productRepository.getProductById(id);
};
