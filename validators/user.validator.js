import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().min(3).min(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
});
const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(100).required(),
});
export { userSchema, userLoginSchema };
