import express from 'express';
import CustomerController from '../controllers/CustomerController';

const CustomerRoutes = express.Router();

CustomerRoutes.post('/', CustomerController.create);
CustomerRoutes.get('/(:id)?', CustomerController.list);

export default CustomerRoutes;
