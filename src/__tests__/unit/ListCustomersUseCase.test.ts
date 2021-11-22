import * as faker from 'faker/locale/pt_BR';
import ListCustomersUseCase from '../../app/ListCustomersUseCase';
import RegisterNotFoundError from '../../domain/Exceptions/RegisterNotFoundError';
import IListCustomersRequest from '../../domain/interfaces/requests/IListCustomersRequest';
import getValidCustomer from '../utils/generateObjects';
import CustomerRepositoryMock from '../utils/repositories';

describe('List Customers Use Case', () => {
  describe('given request is valid', () => {
    it.each([
      '',
      null,
      undefined,
    ])('when customerId is %p then should return success response', async (customerId: any) => {
      expect.hasAssertions();

      const sut = new ListCustomersUseCase(CustomerRepositoryMock);

      const req: IListCustomersRequest = {
        customerId,
      };

      CustomerRepositoryMock.list.mockResolvedValue([
        getValidCustomer(),
      ]);

      let error;

      try {
        await sut.execute(req);
      } catch (err: any) {
        error = err;
      }

      expect(error).toBeUndefined();
      expect(CustomerRepositoryMock.list).toHaveBeenCalled();
    });

    it('when customerId is not found then should return error response', async () => {
      expect.hasAssertions();

      const sut = new ListCustomersUseCase(CustomerRepositoryMock);

      const req: IListCustomersRequest = {
        customerId: faker.datatype.uuid(),
      };

      CustomerRepositoryMock.list.mockResolvedValue([]);

      let error;

      try {
        await sut.execute(req);
      } catch (err: any) {
        error = err;
      }

      expect(error).toBeInstanceOf(RegisterNotFoundError);
      expect(CustomerRepositoryMock.list).toHaveBeenCalledWith(req.customerId);
    });

    it('when customerId is found then should return success response', async () => {
      expect.hasAssertions();

      const sut = new ListCustomersUseCase(CustomerRepositoryMock);

      const req: IListCustomersRequest = {
        customerId: faker.datatype.uuid(),
      };

      CustomerRepositoryMock.list.mockResolvedValue([
        getValidCustomer(),
      ]);

      let error;

      try {
        await sut.execute(req);
      } catch (err: any) {
        error = err;
      }

      expect(error).toBeUndefined();
      expect(CustomerRepositoryMock.list).toHaveBeenCalledWith(req.customerId);
    });
  });
});
