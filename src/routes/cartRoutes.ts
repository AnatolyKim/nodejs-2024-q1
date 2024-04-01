import express from 'express';
import { getCart, updateCart, emptyCart, createOrder } from '../controllers/cartController';

const cartRouter = express.Router();

cartRouter.get('', getCart);
cartRouter.put('', updateCart);
cartRouter.delete('', emptyCart);
cartRouter.post('/checkout', createOrder);

export default cartRouter;
