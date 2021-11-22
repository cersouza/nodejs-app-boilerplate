import * as faker from 'faker/locale/pt_BR';
import type ICustomer from '../../domain/interfaces/ICustomer';
import ICreateCustomerRequest from '../../domain/interfaces/requests/ICreateCustomerRequest';

const getValidCustomer = (): ICustomer => ({
  id: faker.datatype.uuid(),
  birthday: faker.date.past().toISOString(),
  name: faker.name.findName(),
});

export const getValidCreateCustomerRequest = (): ICreateCustomerRequest => ({
  customer: {
    name: faker.name.findName(),
    birthday: faker.date.past().toISOString(),
  },
});

export default getValidCustomer;
