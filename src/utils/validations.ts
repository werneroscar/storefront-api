import Joi from 'joi';

const nameValidation = (name: string): Joi.StringSchema<string> => {
  return Joi.string()
    .required()
    .min(1)
    .max(50)
    .pattern(/^[a-zA-Z-]+$/)
    .messages({
      'string.pattern.base': `${name} must only contain alphabets and hyphens`
    });
};

const idValidation = (name: string): Joi.StringSchema<string> => {
  return Joi.string()
    .required()
    .pattern(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/
    )
    .messages({
      'string.pattern.base': `Invalid ${name} id`
    });
};

const userSchema = Joi.object({
  firstName: nameValidation('First name'),
  lastName: nameValidation('Last name'),
  password: Joi.string()
    .required()
    .min(8)
    .pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/)
    .messages({
      'string.pattern.base':
        'Password must be at least 8 characters, inlude at lease one number, ' +
        'special character, upper and lower case alphabets'
    })
});

const categorySchema = Joi.object({
  name: nameValidation('Category name')
});

const productSchema = Joi.object({
  name: nameValidation('Product name'),
  price: Joi.number().required().min(1),
  categoryId: Joi.number().required()
});

const uuidSchema = Joi.object({
  id: Joi.string().uuid().required()
});

export { userSchema, categorySchema, productSchema, uuidSchema };
