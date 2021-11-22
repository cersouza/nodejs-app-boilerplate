import express from 'express';
import CustomerRoutes from './CustomerRoutes';

const routes = express.Router();

routes.use('/customers', CustomerRoutes);

export default routes;
