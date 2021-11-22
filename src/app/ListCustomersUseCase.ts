import RegisterNotFoundError from '../domain/Exceptions/RegisterNotFoundError';
import ICustomer from '../domain/interfaces/ICustomer';
import ICustomerRepository from '../domain/interfaces/ICustomerRepository';
import IListCustomersRequest from '../domain/interfaces/requests/IListCustomersRequest';

export default class ListCustomersUseCase {
  private customerRepository: ICustomerRepository;

  constructor(_customerRepository: ICustomerRepository) {
    this.customerRepository = _customerRepository;
  }

  async execute({ customerId }: IListCustomersRequest): Promise<Array<ICustomer>> {
    const customers = await this.listCustomers(customerId);

    return customers;
  }

  private async listCustomers(customerId?: string) {
    const customers = await this.customerRepository.list(customerId);

    if (!customers || !customers.length) {
      throw new RegisterNotFoundError('There was no customer(s) found');
    }

    return customers;
  }
}
