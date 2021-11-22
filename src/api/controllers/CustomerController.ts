import { NextFunction, Request, Response } from 'express';
import ICreateCustomerRequest from '../../domain/interfaces/requests/ICreateCustomerRequest';
import IListCustomersRequest from '../../domain/interfaces/requests/IListCustomersRequest';
import { CreateCustomerInjected, ListCustomersInjected } from '../../infra/injections';

export default class CustomerController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: ICreateCustomerRequest = {
        customer: req.body,
      };

      const data = await CreateCustomerInjected.execute(request);

      res.status(200).json({
        message: 'customer created',
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {
      const request: IListCustomersRequest = {
        customerId: req.params.id,
      };

      const data = await ListCustomersInjected.execute(request);

      res.status(200).json({
        data,
      });
    } catch (error) {
      next(error);
    }
  }
}
