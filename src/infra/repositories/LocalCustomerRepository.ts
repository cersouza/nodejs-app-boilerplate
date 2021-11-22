/* eslint-disable class-methods-use-this */
import ICustomer from '../../domain/interfaces/ICustomer';
import ICustomerRepository from '../../domain/interfaces/ICustomerRepository';

const memoryDB: Array<ICustomer> = [];

export default class LocalCustomerRepository implements ICustomerRepository {
  async create(customer: ICustomer) {
    const newCustomer = {
      ...customer,
      id: memoryDB.length.toString(),
    };

    memoryDB.push(newCustomer);

    return newCustomer;
  }

  async list(customerId: string) {
    let res = memoryDB;

    if (customerId) {
      res = res.filter(({ id }) => id === customerId);
    }

    return res;
  }
}
