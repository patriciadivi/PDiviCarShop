import { Router } from 'express';
import CarsController from '../controllers/CarsController';

const routerCars = Router();

routerCars.get('/', CarsController.ControllerPostCars);

// Teste de routes
// routerCars.get('/', (_req, res) => {
//   res.status(200).json({ message: 'Cars successful' });
// });

export default routerCars;