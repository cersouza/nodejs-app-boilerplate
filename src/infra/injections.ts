import CreateCustomerUseCase from '../use-cases/CreateCustomerUseCase';
import ListCustomersUseCase from '../use-cases/ListCustomersUseCase';
import LocalCustomerRepository from './repositories/LocalCustomerRepository';

const CustomerRepository = new LocalCustomerRepository();

export const CreateCustomerInjected = new CreateCustomerUseCase(CustomerRepository);
export const ListCustomersInjected = new ListCustomersUseCase(CustomerRepository);
