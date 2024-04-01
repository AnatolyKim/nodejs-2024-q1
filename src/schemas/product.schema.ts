import Joi from "joi";

export const productSchema = Joi.object({
  id: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  title: Joi.string().required(),
});