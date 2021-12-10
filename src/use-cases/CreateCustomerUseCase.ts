import InvalidRequestError from '../domain/exceptions/InvalidRequestError';
import ICustomer from '../domain/interfaces/ICustomer';
import type ICustomerRepository from '../domain/interfaces/ICustomerRepository';
import type ICreateCustomerRequest from '../domain/interfaces/requests/ICreateCustomerRequest';
import CustomerValidator from '../domain/validators/CustomerValidator';

export default class CreateCustomerUseCase {
  private customerRepository: ICustomerRepository;

  constructor(_customerRepository: ICustomerRepository) {
    this.customerRepository = _customerRepository;
  }

  async execute(request: ICreateCustomerRequest): Promise<ICustomer> {
    CreateCustomerUseCase.validate(request);

    return this.customerRepository.create(request.customer);
  }

  static validate(request: ICreateCustomerRequest) {
    const validations = CustomerValidator.validate(request.customer);

    if (validations.error?.message) {
      throw new InvalidRequestError(validations.error.message);
    }
  }
}
