import type ICustomer from '../ICustomer';

export type CustomerWithoutId = Omit<ICustomer, 'id'>;

interface ICreateCustomerRequest {
  customer: CustomerWithoutId;
}

export default ICreateCustomerRequest;
