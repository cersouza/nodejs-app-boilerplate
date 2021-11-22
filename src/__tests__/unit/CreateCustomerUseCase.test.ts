import * as faker from 'faker/locale/pt_BR';
import CreateCustomerUseCase from '../../app/CreateCustomerUseCase';
import InvalidRequestError from '../../domain/Exceptions/InvalidRequestError';
import ICreateCustomerRequest, { CustomerWithoutId } from '../../domain/interfaces/requests/ICreateCustomerRequest';
import { getValidCreateCustomerRequest } from '../utils/generateObjects';
import CustomerRepositoryMock from '../utils/repositories';

describe('Create Customer Use Case', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('given request is invalid', () => {
    it.each([
      'name',
      'birthday',
    ])('when %p prop is missing then should return validation error', async (propertyName: string) => {
      expect.hasAssertions();

      const sut = new CreateCustomerUseCase(CustomerRepositoryMock);

      const req: ICreateCustomerRequest = getValidCreateCustomerRequest();

      delete req.customer[propertyName as keyof CustomerWithoutId];

      let error;

      try {
        await sut.execute(req);
      } catch (err: any) {
        error = err;
      }

      expect(error).toBeInstanceOf(InvalidRequestError);
      expect(error.message).toContain(propertyName);
      expect(CustomerRepositoryMock.create).not.toHaveBeenCalled();
    });

    it.each([
      faker.datatype.string(9),
      faker.datatype.string(10),
      faker.datatype.string(11),
    ])('when birthday value is %p then should return validation error', async (birthday: string) => {
      expect.hasAssertions();

      const sut = new CreateCustomerUseCase(CustomerRepositoryMock);

      const req: ICreateCustomerRequest = getValidCreateCustomerRequest();
      req.customer.birthday = birthday;

      let error;

      try {
        await sut.execute(req);
      } catch (err: any) {
        error = err;
      }

      expect(error).toBeInstanceOf(InvalidRequestError);
      expect(error.message).toContain('birthday');
      expect(CustomerRepositoryMock.create).not.toHaveBeenCalled();
    });
  });

  describe('given request is valid', () => {
    it('then should return successfully', async () => {
      expect.hasAssertions();

      const sut = new CreateCustomerUseCase(CustomerRepositoryMock);

      const req: ICreateCustomerRequest = getValidCreateCustomerRequest();

      let error;

      try {
        await sut.execute(req);
      } catch (err: any) {
        error = err;
      }

      expect(error).toBeUndefined();
      expect(CustomerRepositoryMock.create).toHaveBeenCalledWith(req.customer);
    });
  });
});
