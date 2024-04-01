export enum ERRORS_MESSAGES {
  CART_NOT_FOUND = 'Cart was not found',
  INTERNAL_SERVER_ERROR = 'Internal server error',
  USER_NOT_FOUND = 'User is not authorized',
  USER_NOT_AUTHORIZED = 'You must be authorized user',
  PRODUCT_NOT_FOUND = 'No product with such id',
  PRODUCTS_INVALID = 'Products are not valid',
  CART_IS_EMPTY = 'Cart is empty',
}

export const ERRORS_MAPPING = new Map<string, number>([
  [ERRORS_MESSAGES.CART_NOT_FOUND, 404],
  [ERRORS_MESSAGES.USER_NOT_FOUND, 403],
  [ERRORS_MESSAGES.USER_NOT_AUTHORIZED, 401],
  [ERRORS_MESSAGES.PRODUCT_NOT_FOUND, 404],
  [ERRORS_MESSAGES.PRODUCTS_INVALID, 400],
  [ERRORS_MESSAGES.CART_IS_EMPTY, 400],
]);