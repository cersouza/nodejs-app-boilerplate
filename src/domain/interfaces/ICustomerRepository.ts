import type ICustomer from './ICustomer';
import { CustomerWithoutId } from './requests/ICreateCustomerRequest';

interface ICustomerRepository {
  create(customer: CustomerWithoutId): Promise<ICustomer>;
  list(id?: string): Promise<Array<ICustomer>>;
}

export default ICustomerRepository;
