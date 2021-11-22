/* eslint-disable arrow-body-style */
import * as faker from 'faker/locale/pt_BR';
import { StatusCodes } from 'http-status-codes';
import supertest from 'supertest';
import app from '../../api/server';
import ICreateCustomerRequest, { CustomerWithoutId } from '../../domain/interfaces/requests/ICreateCustomerRequest';
import { getValidCreateCustomerRequest } from '../utils/generateObjects';

const server = supertest(app);

describe('Customer Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('given request is invalid', () => {
    it.each([
      'name',
    ])('when error is `InvalidRequestError` then should returns BAD_REQUEST error', async (propertyName: string) => {
      expect.hasAssertions();

      const req: ICreateCustomerRequest = getValidCreateCustomerRequest();

      delete req.customer[propertyName as keyof CustomerWithoutId];

      const res = await server
        .post('/customers')
        .send(req);

      expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(res.text).toContain(propertyName);
    });
  });

  describe('given request is valid', () => {
    it('when customer is not found then should returns NOT_FOUND error', async () => {
      expect.hasAssertions();

      const customerId = faker.datatype.uuid();

      const res = await server.get(`/customers/${customerId}`);

      expect(res.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(res.text).toContain('There was no customer(s) found');
    });

    it('when customer is created then should show it on list', async () => {
      expect.hasAssertions();

      const req = getValidCreateCustomerRequest().customer;

      const resCreate = await server
        .post('/customers')
        .send(req);

      const resList = await server
        .get(`/customers/${resCreate.body.data.id}`);

      expect(resCreate.statusCode).toEqual(StatusCodes.OK);
      expect(resList.statusCode).toEqual(StatusCodes.OK);
      expect(resList.body.data[0]).toHaveProperty('id');
    });
  });
});
