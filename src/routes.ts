import express from 'express';
import cartRouter from './routes/cartRoutes';
import productRouter from './routes/productRoutes';
import { authMiddleware } from './middlewares/auth';

const router = express.Router();

router.use('/products', authMiddleware, productRouter);
router.use('/profile/cart', authMiddleware, cartRouter);

export default router;