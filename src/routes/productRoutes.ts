import express from 'express';
import { getProducts, getProductById } from '../controllers/productController';

const productRouter = express.Router();

productRouter.get('', getProducts);
productRouter.get('/:id', getProductById);

export default productRouter;