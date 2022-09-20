import { Request, Response } from 'express';
import { IModel, ICar } from '../interfaces/index';

class CarsController {
  private serviceCar: IModel<ICar>;

  constructor(serviceCar: IModel<ICar>) {
    this.serviceCar = serviceCar;
  }

  public create = async (req: Request, res: Response): Promise<Response | void> => { 
    const resultTeamsServiceAll = await this.serviceCar.create(req.body);
    return res.status(201).json(resultTeamsServiceAll);
  };

  public async read(_req: Request, res: Response<ICar[]>): Promise<void> {
    const list = await this.serviceCar.read();
    res.status(200).json(list);
  }

  public async readOne(req: Request, res: Response<ICar | null>): Promise<void> {
    const item = await this.serviceCar.readOne(req.params.id);
    res.status(200).json(item);
  }

  public async update(req: Request, res: Response<ICar | null>): Promise<void> {
    const updated = await this.serviceCar.update(req.params.id, req.body);
    res.status(200).json(updated);
  }

  public async delete(req: Request, res: Response<ICar | null>): Promise<void> {
    const deleted = await this.serviceCar.delete(req.params.id);
    res.status(204).json(deleted);
  }
}

export default CarsController;