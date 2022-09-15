import { Router } from 'express';

import routerCars from './cars.routes';

const routes = Router();

routes.use('/cars', routerCars);

export default routes;