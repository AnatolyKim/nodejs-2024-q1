import Joi from "joi";
import { productSchema } from "./product.schema";

export const cartItemSchema = Joi.object({
  product: productSchema.required(),
  count: Joi.number().required(),
});

export const cartSchema = Joi.object({
  id: Joi.string().required(),
  userId: Joi.string().required(),
  isDeleted: Joi.boolean().required(),
  items: Joi.array().items(cartItemSchema).required(),
});

