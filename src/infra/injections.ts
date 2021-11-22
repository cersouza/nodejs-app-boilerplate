import CreateCustomerUseCase from '../app/CreateCustomerUseCase';
import ListCustomersUseCase from '../app/ListCustomersUseCase';
import LocalCustomerRepository from './repositories/LocalCustomerRepository';

const CustomerRepository = new LocalCustomerRepository();

export const CreateCustomerInjected = new CreateCustomerUseCase(CustomerRepository);
export const ListCustomersInjected = new ListCustomersUseCase(CustomerRepository);
