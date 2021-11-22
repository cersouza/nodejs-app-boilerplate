import Joi from 'joi';
import type ICustomer from '../interfaces/ICustomer';

const ISODateTimePattern = /\d{4}-\d{2}-\d{2}/;

const CustomerValidator = Joi.object<ICustomer>({
  name: Joi.string()
    .required(),
  birthday: Joi.string()
    .pattern(ISODateTimePattern)
    .message('birthday must follow the yyyy-mm-dd pattern')
    .required(),
});

export default CustomerValidator;
