import { Router, Request, Response } from 'express';
import CarsController from '../controllers/CarsController';
import ServicePostCars from '../services/ServicePostCars';
import CarMongodb from '../models/CarMongodb';

const routerCars = Router();

const carMongodb = new CarMongodb();
const servicePostCars = new ServicePostCars(carMongodb);
const carsController = new CarsController(servicePostCars);

routerCars.post('/', (req: Request, res: Response) => carsController.create(req, res));
routerCars.get('/', (req: Request, res: Response) => carsController.read(req, res));
routerCars.get('/:id', (req: Request, res: Response) => carsController.readOne(req, res));
routerCars.put('/:id', (req: Request, res: Response) => carsController.update(req, res));
routerCars.delete('/:id', (req: Request, res: Response) => carsController.delete(req, res));

// Teste de routes
// routerCars.get('/', (_req, res) => {
//   res.status(200).json({ message: 'Cars successful' });
// });

export default routerCars;